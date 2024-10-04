const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const date = new Date();
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

let allData = [];
apiDataa("cairo");

async function apiDataa(city) {
    var apiData = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=09bd680e19d04b2cab5171238243009&q=${city}&days=3`);
    weatherData = await apiData.json();
    allData = weatherData;
    console.log(allData);
    display();

}
searchBtn.addEventListener("click", function () {
    let city = searchInput.value;
    apiDataa(city);
    clearInputs();
})
function clearInputs() {
    searchInput.value = null;
}
function display() {
    var cartona = ``;


    if (allData && allData.forecast && allData.forecast.forecastday) {
        const currentForecast = allData.forecast.forecastday[0].day;
        cartona += `
            <div class="col-md-4">
                <div class="item">
                    <div class="card   border border-2  border-info bg-transparent">
                        <div class="card-header bg-transparent  d-flex justify-content-between text-danger" id="rowDate">
                            <span>
                                ${days[date.getDay()]}
                            </span>
                            <span>
                                ${date.getDate()}
                                ${months[date.getMonth()]}
                            </span>
                        </div>
                        <div class="card-body text-danger">
                            <h3 class="card-title ">${allData.location.name}</h3>
                            <br>
                            <br>
                            <span class="card-text  fs-3 fw-bold">${currentForecast.maxtemp_c} C</span> 
                            <br> 
                            <br> 
                            <span class="card-text  fw-bold">${currentForecast.condition.text}</span>
                            <br>  
                            <br>  
                            <img src="${currentForecast.condition.icon}">
                            <br>
                            <br>
                            <div class="d-flex justify-content-between text-danger">
                                <span>
                                    <i class="fa-brands fa-forumbee"></i>
                                    ${currentForecast.avghumidity}%
                                </span>
                                <span>
                                    <i class="fa-solid fa-wand-magic-sparkles"></i>
                                    ${currentForecast.maxwind_kph}km/h
                                </span>
                                <span>
                                    <i class="fa-solid fa-droplet"></i>
                                    ${currentForecast.totalprecip_mm}mm
                                </span>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
            `;
        for (var i = 1; i < 3; i++) {
            const forecastDay = new Date(date.getTime() + i * 24 * 60 * 60 * 1000);
            const forecast = allData.forecast.forecastday[i].day;
            cartona += `
                <div class="col-md-4">
                    <div class="item">
                        <div class="card   border border-2 border-info  bg-transparent text-danger">
                            <div class="card-header bg-transparent  text-center" id="rowDate">
                                
                                <span>
                                    ${forecastDay.getDate()}
                                    ${months[forecastDay.getMonth()]}
                                </span>
                            </div>
                            <div class="card-body text-center text-danger">
                                
                                <br>
                                <img src="${forecast.condition.icon}">
                                
                                <br> 
                                <br> 
                                <span class="card-text  fs-4 fw-bold ">${forecast.maxtemp_c} C</span> 
                                <br>
                                <span class="card-text  fs-4 ">${forecast.mintemp_c} C</span> 
                                <br>  
                                <br>  
                                <span class="card-text  fw-bold">${forecast.condition.text}</span>
                                <br>
                                <br>
                                <br>
                                <br>
                            </div>
                        </div>
                    </div>
                </div>
                `;
        }
    } else {
        cartona += `
            <div class="col-md-12">
                <div class="alert alert-danger" role="alert">
                    No weather data available. Please try again later.
                </div>
            </div>
            `;
    }

    document.getElementById("rowData").innerHTML = cartona;
}