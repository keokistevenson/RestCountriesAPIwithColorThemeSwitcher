# Frontend Mentor - REST Countries API with color theme switcher solution

This is a solution to the [REST Countries API with color theme switcher challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca). 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Reflections](#Reflections)



## Overview

### The challenge

Users should be able to:

- See all countries from the API on the homepage
- Search for a country using an `input` field
- Filter countries by region
- Click on a country to see more detailed information on a separate page
- Click through to the border countries on the detail page
- Toggle the color scheme between light and dark mode *(optional)*

### Screenshot

![](./screenshot.png)


### Links

- Solution URL: [Add solution URL here](https://github.com/keokistevenson/RestCountriesAPIwithColorThemeSwitche)
- Live Site URL: [Add live site URL here](https://keokistevenson.github.io/RestCountriesAPIwithColorThemeSwitcher/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid

### What I learned

Use this section to recap over some of your major learnings while working through this project. Writing these out and providing code samples of areas you want to highlight is a great way to reinforce your own knowledge.

To see how you can add code snippets, see below:

```html
<label class="sr-only" for="txtSearch">Search:</label>
```

```css
:root {
    --bg-page: #f0f0f0;
    --bg-element: #ffffff;
    --text-main: #333333;
    --text-heading: #000000;
    --shadow-soft: 0 2px 8px rgba(0, 0, 0, 0.08);
    --shadow-header: 0 2px 8px rgba(0, 0, 0, 0.06);
}

```

```TypeScript
export type Country = {

    commonName: string;
    officialName: string;
    region: string;
    population: number;
    capital: string;
    pngFlag: string;
    svgFlag: string;
    countryCode: string;
};

export type CountryDetail = {
    commonName: string;
    officialName: string;
    nativeName: string;
    pngFlag: string;
    svgFlag: string;
    population: number;
    region: string;
    subregion: string;
    capital: string;
    tld: string[];
    currencies: string[];
    languages: string[];
    borders: string[];
    countryCode: string;
};
```
```js
// Copilot Suggestion? This is NOT the “batch optimization” fragment pattern
// countryCardsContainer.appendChild(cardFragment);

// Appending clone to the document fragment (still in memory, not the DOM)
documentFragment.appendChild(cardFragment);
 countryCardsContainer.appendChild(documentFragment);
```

### Continued development

I want to continue focusing on using a variety of techniques and skills in learned such as event delegation, document fragments, CSS variables, error classes, modular TypeScript to name a few. I would also like to understand why some Node or TypeScript commands work and others don't.


### Useful resources

- [Example resource 1](https://www.youtube.com/watch?v=5wLrz_zUwoU) - This video helped me learn and apply CSS variables.
- [Example resource 2](https://www.youtube.com/watch?v=XF1_MlZ5l6M) - This video discusses event capturing and bubbling which I didn't need.
- [Example resource 2](https://emojicombos.com/search) - This website gave me easily to use character icons that I could quickly include on my buttons.


## Author

- Website - [Add your name here](https://www.linkedin.com/in/keokistevenson/)

I’m a Full-Stack software developer with a strong foundation in C# and the .NET ecosystem, specializing in building scalable web applications and RESTful APIs using ASP.NET Core and Entity Framework. I enjoy working on systems end-to-end—from designing normalized databases to optimizing application performance and maintainability.

## Reflections

Write a 200-300 word reflection discussing your development process, challenges faced, solutions implemented, and potential improvements.
I hate working on teh CSS and mining the data for native name and currency was horrendous.
