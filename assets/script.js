/**
Author:    Build Rise Shine with Nyros (BRS)
Created:   11.05.2022
Library / Component: Script file
Description: Logic behind the app(fetching the data from the API)
(c) Copyright by BRS with Nyros.
**/
window.onload = function () {
  document.querySelector(".input-search").value = "";
};

const api_details = {
  url: "http://api.openweathermap.org/data/2.5/",
  api_key: "60bbd59ec7556e88c0f6b5a2080aebaa",
};

const input = document.querySelector(".input-search");
input.addEventListener("keypress", showData);

async function showResults(value) {
  const data = await fetch(
    `${api_details.url}weather?q=${value}&units=metric&APPID=${api_details.api_key}`
  );
  const fdata = await data.json();
  if (fdata.message === "city not found") {
    document.querySelector(".location-city").innerText = null;
    document.querySelector(".location-date").innerText = null;
    document.querySelector(".temperature-temp").innerHTML = null;
    document.querySelector(".temperature-type").innerText = null;
    document.getElementById("city_not_found")?.remove();
    const ele = document.createElement("h2");
    ele.className = "heady";
    ele.setAttribute("id", "city_not_found");
    ele.appendChild(document.createTextNode("City Not Found"));
    const fff = document.querySelector(".temperature");
    fff.appendChild(ele);
  } else {
    displayData(fdata);
  }
}

function showData(e) {
  if (e.keyCode === 13) {
    showResults(input.value);
  }
}

function displayData(data) {
  document.getElementById("city_not_found")?.remove();
  const location_city = document.querySelector(".location-city");
  location_city.innerText = `${data.name},${data.sys.country}`;
  let time = new Date();
  const date = document.querySelector(".location-date");
  let months_year = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days_week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days_week[time.getDay()];
  let pdate = time.getDate();
  let month = months_year[time.getMonth()];
  let year = time.getFullYear();
  date.innerText = `${day} ${pdate} ${month} ${year}`;
  const tempp = document.querySelector(".temperature-temp");
  tempp.innerHTML = `${Math.round(data.main.temp)}
			<span>&#730C</span>
		`;
  const type = document.querySelector(".temperature-type");
  type.innerText = `${data.weather[0].main}`;
}

function setTheme(theme) {
  document.documentElement.style.setProperty("--primary-color", theme);
  localStorage.setItem("weather-theme", theme);
}
setTheme(localStorage.getItem("weather-theme") || "#1A4B84");
