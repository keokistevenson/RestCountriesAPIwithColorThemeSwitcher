"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchData = fetchData;
// Create API requests using async/await and Promises.
async function fetchData() {
    try {
        const response = await fetch("https://dummyjson.com/products?limit=5");
        // Checking response
        console.log("status:", response.status);
        console.log("ok:", response.ok);
        // if (!response.ok) {
        //   throw new HttpError(response.status, 'Failed to fetch products');
        // }
        const data = await response.json();
        console.log(data);
        // if (!data.products) {
        //   throw new DataError('Missing products data');
        // }
        return data.products;
    }
    catch (error) {
        // if (error instanceof TypeError) {
        //   throw new NetworkError('Network issue occurred');
        // }
        console.error("Fetch error:", error);
        throw error;
    }
}
fetchData();
//# sourceMappingURL=apiService.js.map