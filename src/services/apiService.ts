import type { Country, CountryDetail } from "../types/types.js";
import { NetworkError, HttpError, DataError } from '../utils/errorHandler';



// Create API requests using async/await and Promises.
export async function fetchCountries(): Promise<Country[]> {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all?fields=name,cca3,region,capital,population,flags");

    // Checking response
    console.log("status:", response.status);
    console.log("ok:", response.ok);

    if (!response.ok) {
      throw new HttpError(response.status, 'Failed to fetch countries');
    }

    const countries = await response.json();

    console.log("There are lots of countries", countries.length);
    console.log(countries);

    if (!Array.isArray(countries) || countries.length === 0) {
      throw new DataError("Missing country data");
    }

    // Do a simple conversion of data that is not in the format we want.
    for (const country of countries) {
      country.countryCode = country.cca3;
      delete country.cca3;

      // Remove flag links from flags object and delete the flags object.
      country.pngFlag = country.flags.png;
      country.svgFlag = country.flags.svg;
      delete country.flags;

      country.capital = country.capital?.join(", ") ?? "None";

      country.commonName = country.name.common;
      country.officialName = country.name.official;
      delete country.name;
    }

    return countries;

  } catch (error) {

    if (error instanceof TypeError) {
      throw new NetworkError("Network issue occurred while fetching country data");
    }

    console.error("Fetch error:", error);

    throw error;
  }
}
// fetchCountries();

// Create API requests using async/await and Promises.
export async function fetchCountryDetails(countryCode: string): Promise<CountryDetail[]> {
  try {

    // Currently it is not necessary to specify fields when providing country codes.
    const url: string = `https://restcountries.com/v3.1/alpha?codes=${countryCode}`;
    const response = await fetch(url);

    // Checking response
    console.log("status:", response.status);
    console.log("ok:", response.ok);

    if (!response.ok) {
      throw new HttpError(response.status, 'Failed to fetch country details');
    }

    const countryDetails = await response.json();

    console.log("There are lots of country details", countryDetails.length);
    console.log(countryDetails);

    if (!Array.isArray(countryDetails) || countryDetails.length === 0) {
      throw new DataError("Missing country detail data");
    }

    // Do a simple conversion of data that is not in the format we want.
    for (const countryDetail of countryDetails) {
      countryDetail.countryCode = countryDetail.cca3;
      delete countryDetail.cca3;

      // Remove flag links from flags object and delete the flags object.
      countryDetail.pngFlag = countryDetail.flags.png;
      countryDetail.svgFlag = countryDetail.flags.svg;
      delete countryDetail.flags;

      countryDetail.commonName = countryDetail.name.common;
      countryDetail.officialName = countryDetail.name.official;
      countryDetail.nativeName = countryDetail.name.common;
      delete countryDetail.name;

      countryDetail.capital = countryDetail.capital?.join(", ") ?? "None";
      countryDetail.subregion = countryDetail.subregion ?? "N/A";

      const languages = countryDetail.languages;
      countryDetail.languages = languages ? Object.values(languages) : [];

      const currencies = countryDetail.currencies as Record<string, { name: string; symbol: string }> | undefined;
      countryDetail.currencies = currencies
        ? Object.values(currencies).map(currency => currency.name)
        : [];
    }

    console.log("exiting fetchCountryDetailsAPI Call");

    return countryDetails;

  } catch (error) {

    if (error instanceof TypeError) {
      throw new NetworkError("Network issue occurred while fetching country details");
    }

    console.error("Fetch error:", error);

    throw error;
  }
}
//fetchCountryDetails("CAN");