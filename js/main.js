async function getWeather(city=`cairo`) {
    try {
        let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=762b4a85b0c64ed6998105842241007&q=${city}&days=3`);

        if (!response.ok) {
            throw new Error("Failed to fetch weather data");
        } 
        let data = await response.json();
        
        displayData(data);

    } catch (error) {
        console.log("Error fetching weather data:", error);
    }
}

function displayData(data) {
    let cartona = "";
    for (let i = 0; i < data.forecast.forecastday.length; i++) {
        let dayIndex = new Date(data.forecast.forecastday[i].date).getDay();
        let monthIndex = new Date(data.forecast.forecastday[i].date).getMonth();
        let dayOfWeek = getDayOfWeek(dayIndex);
        let monthName = getMonthName(monthIndex);
        let dayDate = new Date(data.forecast.forecastday[i].date).getDate();
        let rainChance = data.forecast.forecastday[i].day.daily_chance_of_rain;
        let windSpeed = data.forecast.forecastday[i].day.maxwind_kph;
        let windDir = data.forecast.forecastday[i].day.wind_dir;
        let icon = data.forecast.forecastday[i].day.condition.icon;

        if (i == 0) {
            cartona += `<div class="item1 col-md-4 p-0">
            <div class="date d-flex justify-content-between pb-3 w-100">
              <div class="day">${dayOfWeek}</div>
              <div class="day-date">${dayDate} ${monthName}</div>
            </div>
             <div class="content align-self-start">
                 <div class="py-2">${data.location.name}</div>
                 <div><h2 class="position-relative px-1">${data.forecast.forecastday[i].day.maxtemp_c} <span class="power position-absolute">o</span>C</h2></div>
             </div>
             <div class="img-icon">
                 <img src="${icon}" alt="" class="w-25">
             </div>
             <div class="custom desc-color pb-3 px-2">${data.forecast.forecastday[i].day.condition.text}</div>
             <div class="icona d-flex pb-4">
                 <span class="px-3"><img src="images/icon-umberella.png" alt=""> ${rainChance}%</span>
                 <span class="px-3"><img src="images/icon-wind.png" alt=""> ${windSpeed} km/h</span>
                 <span class="px-3"><img src="images/icon-compass.png" alt="">East</span>
             </div>
         </div>`;
        }
       else if (i == 1) {
            cartona += `<div class="item2 text-center col-md-4 p-0">
                    <div class="day w-100 pb-3">${dayOfWeek}</div>
                    <div class="img-icon pt-5"><img src="https:${icon}" alt="" class="w-15"></div>
                    <div class="py-3">  
                        <h4 class="degree position-relative">${data.forecast.forecastday[i].day.maxtemp_c}<span class="power2 position-absolute">o</span>C</h4>
                      <div class="py-2 desc-color">${data.forecast.forecastday[i].day.condition.text}</div>
                  </div>
            </div>`;   
        }else{
            cartona += `<div class="item3 text-center col-md-4 p-0">
            <div class="day w-100 pb-3">${dayOfWeek}</div>
            <div class="img-icon pt-5"><img src="https:${icon}" alt="" class="w-15"></div>
            <div class="py-3">  
                <h4 class="degree position-relative">${data.forecast.forecastday[i].day.maxtemp_c}<span class="power2 position-absolute">o</span>C</h4>
              <div class="py-2 desc-color">${data.forecast.forecastday[i].day.condition.text}</div>
          </div>
    </div>`;  

        }
    }
    document.getElementById("data-row").innerHTML = cartona;
}

function getDayOfWeek(dayIndex) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeek[dayIndex];
}

function getMonthName(monthIndex) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[monthIndex];
}

getWeather();

let submit=document.getElementById('submit')
let search=document.getElementById('search')
submit.addEventListener('click',function(){
    let city=search.value;
    getWeather(search.value)

    })
