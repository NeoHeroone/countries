const allCountries = document.querySelector(".all-countries");
const countrySearch = document.querySelector(".search-country");
const regionSearch = document.querySelectorAll(".dropdown-value");
const dropdown = document.querySelector(".dropdown-search");
const dropdownBox = document.querySelector(".dropdown-menu");
const label = document.querySelector(".label");
const lightMode = document.querySelector(".light-mode");
const darkMode = document.querySelector(".dark-mode");
const navBar = document.querySelector(".nav-bar");
const mode = document.querySelectorAll(".mode");
const body = document.querySelector("body");
const inputSearch = document.querySelector(".input-search");
const dropdownSearch = document.querySelector(".dropdown-search");
const searchIcon = document.querySelector(".search-icon");
const countriess = document.querySelectorAll(".country");

darkMode.addEventListener("click", () => {
  localStorage.setItem("isDarkModeActive", "true");
  lightMode.classList.remove("hidden");
  darkMode.classList.add("hidden");
  darkModeEnable();
});

lightMode.addEventListener("click", () => {
  localStorage.setItem("isDarkModeActive", "false");
  lightMode.classList.add("hidden");
  darkMode.classList.remove("hidden");
  lightModeEnable();
});

function darkModeEnable() {
  navBar.classList.add("dark-theme");
  navBar.firstElementChild.firstElementChild.classList.add("dark-theme-text");
  allCountries.classList.add("dark-themeee");
  mode[1].classList.add("dark-theme-text");
  body.classList.add("dark-bg");
  inputSearch.classList.add("dark-theme");
  dropdownSearch.classList.add("dark-theme", "dark-theme-text");
  dropdownBox.classList.add("dark-theme", "dark-theme-text");
  dropdownBox.classList.remove("bg");
  searchIcon.style.color = "white";
  countrySearch.classList.add("search-country-dark");
}

function lightModeEnable() {
  navBar.classList.remove("dark-theme");
  navBar.firstElementChild.firstElementChild.classList.remove(
    "dark-theme-text"
  );
  body.classList.remove("dark-bg");
  inputSearch.classList.remove("dark-theme");
  dropdownSearch.classList.remove("dark-theme", "dark-theme-text");
  searchIcon.style.color = "#808080";
  countrySearch.classList.remove("search-country-dark");
  dropdownBox.classList.remove("dark-theme", "dark-theme-text");
  allCountries.classList.remove("dark-themeee");
  dropdownBox.classList.add("bg");
}

window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("isDarkModeActive") === "true") {
    lightMode.classList.remove("hidden");
    darkMode.classList.add("hidden");
    darkModeEnable();
  } else {
    lightMode.classList.add("hidden");
    darkMode.classList.remove("hidden");
    lightModeEnable();
  }
});

dropdown.addEventListener("click", () => {
  dropdownBox.classList.toggle("hidden");
});

regionSearch.forEach((value) => {
  value.addEventListener("click", () => {
    label.firstElementChild.innerText = value.innerText;
  });
});

fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    renderCountries(data);

    countrySearch.addEventListener("input", () => {
      const filterValue = countrySearch.value.toLowerCase();
      const filteredData = data.filter((country) =>
        country.name.common.toLowerCase().includes(filterValue)
      );
      renderCountries(filteredData);
    });

    regionSearch.forEach((value) => {
      value.addEventListener("click", () => {
        const region = value.innerText;
        const filteredData =
          region === "All"
            ? data
            : data.filter((country) => country.region === region);
        renderCountries(filteredData);
      });
    });
  })
  .catch((err) => {
    console.error(err);
  });

function renderCountries(countries) {
  allCountries.innerHTML = countries
    .map((country) => {
      const commaSeparatedPopulation = country.population.toLocaleString();
      return `
        <div class="country ${
          localStorage.getItem("isDarkModeActive") === "true"
            ? "dark-theme dark-theme-text"
            : ""
        }">
          <img src="${country.flags.png}" alt="Flag of ${
        country.name.common
      }" />
          <h1 class="country-name">${country.name.common}</h1>
          <div class="more-detail">
            <p class="population"><b>Population:</b> ${commaSeparatedPopulation}</p>
            <p class="region"><b>Region:</b> ${country.region}</p>
            <p class="capital"><b>Capital:</b> ${country.capital || "N/A"}</p>
          </div>
        </div>
      `;
    })
    .join("");

  document.querySelectorAll(".country").forEach((countryCard, index) => {
    countryCard.addEventListener("click", () => {
      location.href = `contryAbdout.html?name=${countries[index].name.common}`;
    });
  });
}
