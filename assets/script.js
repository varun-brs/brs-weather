window.onload = function () {
  document.querySelector(".input-search").value = "";
};

const api_details = {
  url: "https://api.openweathermap.org/data/2.5/",
  api_key: "60bbd59ec7556e88c0f6b5a2080aebaa",
};

const input = document.querySelector(".input-search");
input.addEventListener("keypress", showData);

async function showResults(value) {
  try {
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
  } catch (error) {
    console.log("error threee");
  }
}

function showData(e) {
  const dummyCont = document.querySelector(".dummy-cont");
  dummyCont.textContent = "";
  if (e.keyCode === 13) {
    showResults(input.value);
  }
}

function extraDetails(data) {
  const dummyCont = document.querySelector(".dummy-cont");
  const minTemp = document.createElement("h2");
  minTemp.textContent = `Min-Temp : ${data.main.temp_min}`;
  dummyCont.appendChild(minTemp);

  const maxTemp = document.createElement("h2");
  maxTemp.textContent = `Max-Temp : ${data.main.temp_max}`;
  dummyCont.appendChild(maxTemp);
}

function displayData(data) {
  console.log(data);
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
  const dummyCont = document.querySelector(".dummy-cont");
  const btnEle = document.createElement("button");
  btnEle.className = "btn-ele";
  btnEle.textContent = "Know More";
  btnEle.addEventListener("click", function () {
    extraDetails(data);
  });
  dummyCont.appendChild(btnEle);
}
