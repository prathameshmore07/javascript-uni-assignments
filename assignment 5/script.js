var button = document.getElementById("btn");
var result = document.getElementById("result");
var select = document.getElementById("countries");

button.onclick = async function () {

  var country = select.value;

  if (country == "") {
    result.innerHTML = "Please select a country";
    return;
  }

  var lat = 0;
  var lon = 0;
  var city = "";

  if (country == "india") {
    lat = 28.61;
    lon = 77.20;
    city = "India";
  }
  else if (country == "china") {
    lat = 39.90;
    lon = 116.40;
    city = "China";
  }
  else if (country == "russia") {
    lat = 55.75;
    lon = 37.61;
    city = "Russia";
  }
  else if (country == "usa") {
    lat = 38.90;
    lon = -77.03;
    city = "USA";
  }
  else if (country == "japan") {
    lat = 35.68;
    lon = 139.69;
    city = "Japan";
  }

  try {
    const response = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=" +
      lat +
      "&longitude=" +
      lon +
      "&current_weather=true"
    );

    const data = await response.json();

    result.innerHTML =
      "Country: " + city + "<br>" +
      "Temperature: " + data.current_weather.temperature + " °C<br>" +
      "Wind Speed: " + data.current_weather.windspeed;

  } catch (error) {
    result.innerHTML = "Error fetching weather";
  }
};
