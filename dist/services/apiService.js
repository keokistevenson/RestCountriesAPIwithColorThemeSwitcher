// Create API requests using async/await and Promises.
export async function fetchCountries() {
    try {
        const response = await fetch("https://restcountries.com/v3.1/all?fields=name,cca3,region,capital,population,borders,flags");
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
            // Remove flag links from flags object and delete the flags object.
            country.pngFlag = country.flags.png;
            country.svgFlag = country.flags.svg;
            delete country.flags;
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
// fetchCountries();
//# sourceMappingURL=apiService.js.map