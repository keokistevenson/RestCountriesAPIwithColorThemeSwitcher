import { fetchCountries } from "./services/apiService.js";

console.log("index.ts loaded");

// Form controls
const txtSearch = document.getElementById("txtSearch") as HTMLInputElement;
const ddlRegions = document.getElementById("ddlRegions") as HTMLSelectElement;

// Template Controls
const countryCardsContainer = document.getElementById("countries-card-container") as HTMLElement;
const countryCardTemplate = document.getElementById("country-card-template") as HTMLTemplateElement;





// Use asynchronous functions to fetch product data and display it.
async function displayCountries(): Promise<void> {
    try {
        const countries = await fetchCountries();


        for (const country of countries) {
            // console.log(country);

            // Create the Clone
            // The clone lives only in memory at this point (not the DOM).
            // cloneNode(true) deep-copies the template including all its children.
            // I was planning to use document fragment anyway, but I found out its required in TS if i use a template.
            const cardFragment = countryCardTemplate.content.cloneNode(true) as DocumentFragment;

            // Get references to the cloned elements we want to add.
            const card = cardFragment.querySelector(".country-card") as HTMLElement;  // Article Element
            const flag = cardFragment.querySelector(".country-card-flag") as HTMLImageElement;
            const countryName = cardFragment.querySelector(".country-card-name") as HTMLElement;
            const population = cardFragment.querySelector(".country-card-population") as HTMLElement;
            const region = cardFragment.querySelector(".country-card-region") as HTMLElement;
            const capital = cardFragment.querySelector(".country-card-capital") as HTMLElement;

            card.dataset.id = country.countryCode;

            // Image Attributes
            flag.src = country.pngFlag;
            flag.alt = `${country.commonName} flag`;

            countryName.textContent = country.commonName;
            population.textContent = country.population.toLocaleString();
            region.textContent = country.region;
            capital.textContent = country.capital || "N/A";  // One country doesn't have a capital

            // Copilot Suggestion? This is NOT the “batch optimization” fragment pattern
            countryCardsContainer.appendChild(cardFragment);



        }

    } catch (error) {
        console.error("Application error:", error);
    }
}
displayCountries();
