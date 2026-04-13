import { fetchCountryDetails } from "./services/apiService.js";
import { CountryDetail } from "./types/types.js";

console.log("details.ts loaded");

// Form controls
const themeToggleButton = document.querySelector(".theme-toggle") as HTMLButtonElement;

// Template Controls
const countryCardsContainer = document.getElementById("countries-card-details-container") as HTMLElement;
const countryCardTemplate = document.getElementById("country-card-template") as HTMLTemplateElement;





// Use asynchronous functions to fetch product data and display it.
async function displayCountryDetails(countryCode: string): Promise<void> {
    try {
        const countryDetails = await fetchCountryDetails(countryCode);

        const documentFragment = document.createDocumentFragment();

        //const countryDetail: CountryDetail = countryDetails[0];
        // console.log("This it is on teh details page:", countryDetail )

        for (const countryDetail of countryDetails) {
            console.log("Print from inside displayCountryDetails", countryDetail);

            // Create the Clone
            // The clone lives only in memory at this point (not the DOM).
            // cloneNode(true) deep-copies the template including all its children.
            // I was planning to use document fragment anyway, but I found out its required in TS if i use a template.
            // I also see that the document fragment can be avoided by just appending directly to the container.
            const cardFragment = countryCardTemplate.content.cloneNode(true) as DocumentFragment;

            // Get references to the cloned elements we want to add.
            const card = cardFragment.querySelector(".country-card") as HTMLElement;  // Article Element
            const flag = cardFragment.querySelector(".country-card-flag-detail") as HTMLImageElement;
            const countryName = cardFragment.querySelector(".country-card-name") as HTMLElement;
            const population = cardFragment.querySelector(".country-card-population") as HTMLElement;
            const region = cardFragment.querySelector(".country-card-region") as HTMLElement;
            const capital = cardFragment.querySelector(".country-card-capital") as HTMLElement;

            const nativeName = cardFragment.querySelector(".country-card-native-name") as HTMLElement;
            const subRegion = cardFragment.querySelector(".country-card-sub-region") as HTMLElement;
            const tld = cardFragment.querySelector(".country-card-tld") as HTMLElement;
            const currencies = cardFragment.querySelector(".country-card-currencies") as HTMLElement;
            const languages = cardFragment.querySelector(".country-card-languages") as HTMLElement;

            // Create attributes for easy identification and filtering later.
            // Doubting this is needed but keep for now or future.
            card.dataset.id = countryDetail.countryCode;
            card.dataset.region = countryDetail.region;
            card.dataset.commonName = countryDetail.commonName.toLowerCase();  // For case-insensitive search filtering.



            // Image Attributes
            flag.src = countryDetail.pngFlag;
            flag.alt = `${countryDetail.commonName} flag`;

            countryName.textContent = countryDetail.commonName;
            population.textContent = countryDetail.population.toLocaleString();
            region.textContent = countryDetail.region;
            capital.textContent = countryDetail.capital || "None";  // One country doesn't have a capital

            nativeName.textContent = countryDetail.nativeName;

            subRegion.textContent = countryDetail.subregion ?? "N/A";


            tld.textContent = countryDetail.tld?.join(", ") ?? "N/A";



            currencies.textContent = countryDetail.currencies.length > 0
                ? countryDetail.currencies.join(", ")
                : "N/A";



            languages.textContent = countryDetail.languages.length > 0
                ? countryDetail.languages.join(", ")
                : "N/A";


            // Copilot Suggestion? This is NOT the “batch optimization” fragment pattern
            // countryCardsContainer.appendChild(cardFragment);

            // Appending clone to the document fragment (still in memory, not the DOM)
            documentFragment.appendChild(cardFragment);
        }

        // Using Batch Optimization to append all cards to the DOM at once using the document fragment.
        countryCardsContainer.appendChild(documentFragment);

    } catch (error) {
        console.error("Application error:", error);
    }
}
displayCountryDetails("CAN");


themeToggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        themeToggleButton.textContent = "☀ Light Mode";
    } else {
        themeToggleButton.textContent = "☾ Dark Mode";
    }
});

// ddlRegions.addEventListener("change", () => {
//     console.log("Selected region:", ddlRegions.value);
//     filterCountries();
// });

// // Input event fires on every change to the text,NOT keydown or keyup.
// txtSearch.addEventListener("input", () => {
//     console.log("Search text:", txtSearch.value);
//     filterCountries();
// });


// function filterCountries(): void {
//     // Capture filter criteria
//     const selectedRegion = ddlRegions.value.toLowerCase();
//     const searchText = txtSearch.value.trim().toLowerCase();

//     const countryCards = countryCardsContainer.querySelectorAll<HTMLElement>(".country-card");

//     console.log(`Selected Region: ${selectedRegion}, Search Text: ${searchText}`);

//     countryCards.forEach(card => {

//         // Simplify card attributes for filtering
//         const cardRegion = (card.dataset.region ?? "").toLowerCase();
//         const cardName = (card.dataset.commonName ?? "").toLowerCase();

//         // Create boolean to determine if card matches filter criteria
//         const matchesRegion =
//             selectedRegion === "" ||
//             selectedRegion === "all" ||
//             cardRegion === selectedRegion;

//         // if (matchesRegion) console.log(`Card Region: ${cardRegion}, Selected Region: ${selectedRegion}`);

//         const matchesSearch =
//             searchText === "" ||
//             cardName.includes(searchText);

//         // Debugging output to verify matching logic
//        // console.log(`Matched Region: ${matchesRegion}, Matched Search Text: ${matchesSearch}`);

//         // Show card if it matches both criteria, otherwise hide it.
//         if (matchesRegion && matchesSearch) {
//             card.style.display = "";  // Show card (default display). We could use display = "block" may have side effects.
//         } else {
//            card.style.display = "none";
//         }
//     });
// }