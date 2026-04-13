import { fetchCountryDetails } from "./services/apiService.js";


console.log("details.ts loaded");

const storedCountryMap = sessionStorage.getItem("countryMap");

const countryMap: Record<string, string> = storedCountryMap
    ? JSON.parse(storedCountryMap)
    : {};

// Form controls
const themeToggleButton = document.querySelector(".theme-toggle") as HTMLButtonElement;

// Template Controls
const countryCardsContainer = document.getElementById("countries-card-details-container") as HTMLElement;
const countryCardTemplate = document.getElementById("country-card-template") as HTMLTemplateElement;

const backButton = document.querySelector(".back-button") as HTMLButtonElement;

backButton.addEventListener("click", () => {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = "index.html";
    }
});


const savedTheme = sessionStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeToggleButton.textContent = "☀ Light Mode";
} else {
    themeToggleButton.textContent = "☾ Dark Mode";
}


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

            const borderList = cardFragment.querySelector(".border-country-list") as HTMLElement;
            const borderTemplate = borderList.querySelector(".border-country") as HTMLButtonElement;

            borderList.innerHTML = "";

            if (!countryDetail.borders || countryDetail.borders.length === 0) {
                borderList.textContent = "None";
            } else {
                countryDetail.borders.forEach(code => {
                    const border = borderTemplate.cloneNode(true) as HTMLButtonElement;

                    border.textContent = countryMap[code] ?? code;

                    border.addEventListener("click", () => {
                        window.location.href = `details.html?code=${code}`;
                    });

                    borderList.appendChild(border);
                });
            }

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


const params = new URLSearchParams(window.location.search);
const countryCode = params.get("code");

if (!countryCode) {
    console.error("Missing country code in URL");
} else {
    displayCountryDetails(countryCode);
}


themeToggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        themeToggleButton.textContent = "☀ Light Mode";
        sessionStorage.setItem("theme", "dark");
    } else {
        themeToggleButton.textContent = "☾ Dark Mode";
        sessionStorage.setItem("theme", "light");
    }
});

