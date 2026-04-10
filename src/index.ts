import { fetchData } from "./services/apiService";


// Use asynchronous functions to fetch product data and display it.
// async function productData(): Promise<void> {
// try {
//     const products = await fetchData();

//     // Instantiate Products
//     for (const item of products) {

//         // Pass the whole object!
//         const product = new Product(item);

//         // this is not how i think.
//         const discountAmount = calculateDiscount(product.price, product.discountPercentage);
//         const discountedPrice = product.getPriceWithDiscount();
//         const tax = calculateTax(product.price, product.category);

//         console.log(product.displayDetails());
//         console.log(`Discount Amount: $${discountAmount.toFixed(2)}`);
//         console.log(`Price After Discount: $${discountedPrice.toFixed(2)}`);
//         console.log(`Tax: $${tax.toFixed(2)}`);
//     }

//     } catch(error) {
//         console.error("Application error:", error);
//     }
// }
// productData();
