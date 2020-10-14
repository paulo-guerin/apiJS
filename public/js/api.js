fetch('https://api.openweathermap.org/data/2.5/forecast?q=Bordeaux&appid=abe78752588a324a4bc81d6ddfe8cf3e')
.then( data => data.json())
.then( resultats => {
  dayResults = resultats.list.slice(0, 7);
  let currentDay = document.getElementById("currentDay");
  let currentDate = new Date();
  let options = {weekday: "long", year: "numeric", month: "long", day: "2-digit"};
  currentDay.innerHTML=currentDate.toLocaleDateString('fr-CA', options);
  dayResults.forEach((hour, key)  => {
    console.log(hour);
    let currentDayAndHour= hour.dt_txt;
    let currentDay=currentDate.getDate();
    console.log(currentDay);
    if(currentDayAndHour.slice(8,10)==currentDay){
      console.log("hello");
      let hourDiv = document.createElement("div");
      currentDayDiv.appendChild(hourDiv);
      hourDiv.className = "hourDiv";
      let hourP = document.createElement("p");
      hourDiv.appendChild(hourP);
      let hourContent = document.createTextNode(currentDayAndHour.slice(11,13)+"h");
      hourP.appendChild(hourContent);

      let hourPTemp = document.createElement("p");
      hourPTemp.className = "hourPTemp";
      hourDiv.appendChild(hourPTemp);
      let hourTemp = Math.round((hour.main.temp-273.15) * 10) / 10;
      hourTemp += "°C";
      let hourTempContent = document.createTextNode(hourTemp);
      hourPTemp.appendChild(hourTempContent);

      let imgWeather = document.createElement("img");
      imgWeather.src="http://openweathermap.org/img/wn/"+hour.weather[0].icon+"@2x.png"
      imgWeather.className = "imgWeatherWeek";
      hourDiv.appendChild(imgWeather);

      let hourPWeather = document.createElement("p");
      hourPWeather.className = "hourPWeather";
      hourDiv.appendChild(hourPWeather);
      let hourWeather = hour.weather[0].description;
      console.log(hourWeather);
      let hourWeatherContent = document.createTextNode(hourWeather);
      hourPWeather.appendChild(hourWeatherContent);
    }
  });
})
.catch( err => console.error('Ca deconne'))

fetch('https://api.openweathermap.org/data/2.5/onecall?lat=44.8333&lon=-0.5667&exclude={part}&appid=abe78752588a324a4bc81d6ddfe8cf3e')
.then( data => data.json())
.then( resultats => {
    daily = resultats.daily;
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    let weekDiv = document.getElementById('weekDiv');
    
    daily.forEach((day, key)  => {
      if(key!=0){
        let dayDiv = document.createElement("div");
        weekDiv.appendChild(dayDiv);
        dayDiv.className = "dayDiv p-1 m-2";

        let dayPDate = document.createElement("p");
        dayPDate.className = "dayPDate";
        dayDiv.appendChild(dayPDate);
        let currentDateFrench = currentDate;
        let options = {weekday: "long", month: "long", day: "2-digit"};
        let dayDateContent = document.createTextNode(currentDateFrench.toLocaleDateString('fr-CA', options));
        dayPDate.appendChild(dayDateContent);

        let dayPTemp = document.createElement("p");
        dayPTemp.className = "dayPTemp";
        dayDiv.appendChild(dayPTemp);
        let dayTemp = Math.round((day.temp.day-273.15) * 10) / 10;
        dayTemp += "°C";
        let dayTempContent = document.createTextNode(dayTemp);
        dayPTemp.appendChild(dayTempContent);

        let imgWeather = document.createElement("img");
        imgWeather.className = "imgWeather";
        imgWeather.src="http://openweathermap.org/img/wn/"+day.weather[0].icon+"@2x.png"
        dayDiv.appendChild(imgWeather);

        let dayPWeather = document.createElement("p");
        dayPWeather.className = "dayPWeather";
        dayDiv.appendChild(dayPWeather);
        let dayWeather = day.weather[0].description;
        let dayWeatherContent = document.createTextNode(dayWeather);
        dayPWeather.appendChild(dayWeatherContent);

        currentDate.setDate(currentDate.getDate() + 1);
      }
    });
  })
.catch( err => console.error('Ca deconne'))

