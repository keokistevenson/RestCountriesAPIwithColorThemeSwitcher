"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchCountries = fetchCountries;
// Create API requests using async/await and Promises.
async function fetchCountries() {
    try {
        const response = await fetch("https://restcountries.com/v3.1/all?fields=name,cca3,region,capital,population,borders,flag");
        // Checking response
        console.log("status:", response.status);
        console.log("ok:", response.ok);
        // if (!response.ok) {
        //   throw new HttpError(response.status, 'Failed to fetch products');
        // }
        const countries = await response.json();
        console.log("There are lots of countries", countries.length);
        console.log(countries);
        // if (!data.products) {
        //   throw new DataError('Missing products data');
        // }
        // Do a simple conversion of data that is not in the format we want.
        for (const country of countries) {
            country.countryCode = country.cca3;
            delete country.cca3;
            country.commonName = country.name.common;
            country.officialName = country.name.official;
            delete country.name;
        }
        return countries;
    }
    catch (error) {
        // if (error instanceof TypeError) {
        //   throw new NetworkError('Network issue occurred');
        // }
        console.error("Fetch error:", error);
        throw error;
    }
}
fetchCountries();
//# sourceMappingURL=apiService.js.map