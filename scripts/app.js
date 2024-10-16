const cityForm = document.querySelector("form")
const card = document.querySelector(".card")
const details = document.querySelector(".details")
const time = document.querySelector("img.time")
const icon = document.querySelector(".icon img")


const updateUI = data => {

  // destructure
  const { cityDets, weather } = data

  details.innerHTML = `
    <div class="details">
        <h3>${cityDets.EnglishName}</h5>
        <div>${weather.WeatherText}</div>
        <div class="weatherCalc">
            <span style="text-transform: uppercase;">${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    </div>
  `

  let iconSrc = `img/icons/${weather.WeatherIcon}.svg`
  icon.setAttribute("src", iconSrc)


  let timeSrc = weather.IsDayTime ? "img/day.svg" : "img/night.svg"
  time.setAttribute("src", timeSrc)

  card.style.display = "block"

}


const updateCity = async city => {

  const cityDets = await getCity(city)
  const weather = await getWeather(cityDets.Key)

  return { cityDets, weather }

}

cityForm.addEventListener("submit", e => {

  e.preventDefault()

  const city = cityForm.city.value.trim()
  cityForm.reset()

  localStorage.setItem("city", city)

  updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err))

})

if (localStorage.getItem("city")) {
  updateCity(localStorage.getItem("city"))
    .then(data => updateUI(data))
    .catch(err => console.log(err))
}