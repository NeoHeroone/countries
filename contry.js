const countryName = new URLSearchParams(location.search).get("name");
const flagImage = document.querySelector(".flag-img");
const borderCountries = document.querySelector(".border-countries");
const lightMode = document.querySelector(".light-mode");
const darkMode = document.querySelector(".dark-mode");
const navBar = document.querySelector(".nav-bar");
const mode = document.querySelectorAll(".mode");
const body = document.querySelector("body");
const moreDetail = document.querySelector(".more-info");
const backBtn = document.querySelector(".back");

const setDarkMode = () => {
  navBar.classList.add("dark-theme");
  navBar.firstElementChild.firstElementChild.classList.add("dark-theme-text");
  mode[1].classList.add("dark-theme-text");
  body.classList.add("dark-bg");
  moreDetail.classList.add("dark-theme-text");
  backBtn.classList.add("dark-theme-text", "dark-theme");
};

const setLightMode = () => {
  navBar.classList.remove("dark-theme");
  navBar.firstElementChild.firstElementChild.classList.remove(
    "dark-theme-text"
  );
  mode[1].classList.remove("dark-theme-text");
  body.classList.remove("dark-bg");
  moreDetail.classList.remove("dark-theme-text");
  backBtn.classList.remove("dark-theme-text", "dark-theme");
};

darkMode.addEventListener("click", () => {
  localStorage.setItem("isDarkModeActive", "true");
  lightMode.classList.remove("hidden");
  darkMode.classList.add("hidden");
  setDarkMode();
});

lightMode.addEventListener("click", () => {
  localStorage.setItem("isDarkModeActive", "false");
  lightMode.classList.add("hidden");
  darkMode.classList.remove("hidden");
  setLightMode();
});

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("isDarkModeActive") === "true") {
    lightMode.classList.remove("hidden");
    darkMode.classList.add("hidden");
    setDarkMode();
  } else {
    lightMode.classList.add("hidden");
    darkMode.classList.remove("hidden");
    setLightMode();
  }
});

fetch(`https://restcountries.com/v3.1/name/${countryName}`)
  .then((res) => res.json())
  .then(([data]) => {
    function borderFind(){
      if(data.borders){
        return JSON.parse(JSON.stringify(data.borders))
      }
      else{
        return borderCountries.innerHTML = "No border countries found";
      }
    }
    const countryInfo = `
            <h1>${data.name.common}</h1>
            <div class="info">
                <p><b>Native Name:</b> ${
                  Object.values(data.name.nativeName)[0]?.common || "N/A"
                }</p>
                <p><b>Population:</b> ${data.population.toLocaleString()}</p>
                <p><b>Region:</b> ${data.region || "No Region"}</p>
                <p><b>Sub Region:</b> ${data.subregion || "No Sub-Region"}</p>
                <p><b>Capital:</b> ${data.capital?.join(", ") || "N/A"}</p>
                <p><b>Top Level Domain:</b> ${data.tld?.join(", ") || "N/A"}</p>
                <p><b>Currencies:</b> ${
                  Object.values(data.currencies)[0]?.name || "N/A"
                }</p>
                <p><b>Languages:</b> ${
                  Object.values(data.languages).join(", ") || "N/A"
                }</p>
            </div>
            
            <b>Border Countries: ${borderFind()}</b>
        `;
    flagImage.src = data.flags.png;
    flagImage.parentElement.nextElementSibling.innerHTML = countryInfo;

    console.log(data)
    
  })
  .catch((err) => console.error(err));