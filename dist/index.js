import { fetchCountries } from "./services/apiService.js";
console.log("index.ts loaded");
// Form controls
const themeToggleButton = document.querySelector(".theme-toggle");
const txtSearch = document.getElementById("txtSearch");
const ddlRegions = document.getElementById("ddlRegions");
// Template Controls
const countryCardsContainer = document.getElementById("countries-card-container");
const countryCardTemplate = document.getElementById("country-card-template");
// Use asynchronous functions to fetch product data and display it.
async function displayCountries() {
    try {
        const countries = await fetchCountries();
        const documentFragment = document.createDocumentFragment();
        for (const country of countries) {
            // console.log(country);
            // Create the Clone
            // The clone lives only in memory at this point (not the DOM).
            // cloneNode(true) deep-copies the template including all its children.
            // I was planning to use document fragment anyway, but I found out its required in TS if i use a template.
            const cardFragment = countryCardTemplate.content.cloneNode(true);
            // Get references to the cloned elements we want to add.
            const cardLink = cardFragment.querySelector(".country-card-link");
            const flag = cardFragment.querySelector(".country-card-flag");
            const countryName = cardFragment.querySelector(".country-card-name");
            const population = cardFragment.querySelector(".country-card-population");
            const region = cardFragment.querySelector(".country-card-region");
            const capital = cardFragment.querySelector(".country-card-capital");
            // Create attributes for easy identification and filtering later.
            cardLink.dataset.id = country.countryCode;
            cardLink.dataset.region = country.region;
            cardLink.dataset.commonName = country.commonName.toLowerCase(); // For case-insensitive search filtering.
            // Image Attributes
            flag.src = country.pngFlag;
            flag.alt = `${country.commonName} flag`;
            countryName.textContent = country.commonName;
            population.textContent = country.population.toLocaleString();
            region.textContent = country.region;
            capital.textContent = country.capital || "None"; // One country doesn't have a capital
            // Copilot Suggestion? This is NOT the “batch optimization” fragment pattern
            // countryCardsContainer.appendChild(cardFragment);
            // Appending clone to the document fragment (still in memory, not the DOM)
            documentFragment.appendChild(cardFragment);
        }
        // Using Batch Optimization to append all cards to the DOM at once using the document fragment.
        countryCardsContainer.appendChild(documentFragment);
    }
    catch (error) {
        console.error("Application error:", error);
    }
}
displayCountries();
themeToggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        themeToggleButton.textContent = "☀ Light Mode";
    }
    else {
        themeToggleButton.textContent = "☾ Dark Mode";
    }
});
ddlRegions.addEventListener("change", () => {
    console.log("Selected region:", ddlRegions.value);
    filterCountries();
});
// Input event fires on every change to the text,NOT keydown or keyup. 
txtSearch.addEventListener("input", () => {
    console.log("Search text:", txtSearch.value);
    filterCountries();
});
function filterCountries() {
    // Capture filter criteria
    const selectedRegion = ddlRegions.value.toLowerCase();
    const searchText = txtSearch.value.trim().toLowerCase();
    const countryCards = countryCardsContainer.querySelectorAll(".country-card-link");
    console.log(`Selected Region: ${selectedRegion}, Search Text: ${searchText}`);
    countryCards.forEach(card => {
        // Simplify card attributes for filtering
        const cardRegion = (card.dataset.region ?? "").toLowerCase();
        const cardName = (card.dataset.commonName ?? "").toLowerCase();
        // Create boolean to determine if card matches filter criteria
        const matchesRegion = selectedRegion === "" ||
            selectedRegion === "all" ||
            cardRegion === selectedRegion;
        // if (matchesRegion) console.log(`Card Region: ${cardRegion}, Selected Region: ${selectedRegion}`);
        const matchesSearch = searchText === "" ||
            cardName.includes(searchText);
        // Debugging output to verify matching logic
        // console.log(`Matched Region: ${matchesRegion}, Matched Search Text: ${matchesSearch}`);
        // Show card if it matches both criteria, otherwise hide it.
        if (matchesRegion && matchesSearch) {
            card.style.display = ""; // Show card (default display). We could use display = "block" may have side effects.
        }
        else {
            card.style.display = "none";
        }
    });
}
//# sourceMappingURL=index.js.map