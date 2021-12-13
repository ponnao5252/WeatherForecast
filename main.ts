
// let selectedCityName = document.getElementById('selectedCityName')!;
let selectedCityName = document.querySelectorAll('.selectedCityName'); //クラス取得
let now_weather:HTMLElement = <HTMLElement>document.getElementById('now_weather')!; 
let weatherIcon:HTMLElement = <HTMLElement>document.getElementById('weatherIcon')!;
let tempTxt:HTMLElement = <HTMLElement>document.getElementById('tempTxt')!;
let now:HTMLElement = <HTMLElement>document.getElementById('now')!;
const getWeatherBtn = document.getElementById('getWeatherBtn')!;
let targetCityId: number;  // 現在の天気を取得する都道府県IDを格納する変数
let apiKey = 'bbd852dbef19eeeec1bde883e321c0bc'; //APIキー

// 背景画像を格納する配列
let weatherImages:string[] = [
  'image/sunny.jpg',
  'image/cloud.jpg',
  'image/rain.jpg',
  'image/snow.jpg',
  'image/atmosphere.jpg',
  'image/thunderstorm.jpg',
  'image/Drizzle.jpg'
]

selectedCityName.forEach((target) => {
  target.addEventListener('click',() => {
    targetCityId = parseInt(target.getAttribute("data-value")!);
    // console.log(targetCityId);
      const requestUrl = 'https://api.openweathermap.org/data/2.5/weather?id=' + targetCityId + '&lang=ja' + '&units=metric' + '&appid=' + apiKey ;

  // Ajax通信用のオブジェクトを作成
  let xhr: XMLHttpRequest= new XMLHttpRequest();

  //  通信方式とURLを設定
  xhr.open('GET', requestUrl);

  // 通信を実行する
  xhr.send();

  // 通信ステータスが変わったら実行される関数
  xhr.onreadystatechange = function() {
    if(xhr.readyState == 4) {
      ShowTodayWeather(xhr.responseText);
    }
  }
})

// 今日の天気を表示する
function ShowTodayWeather(response: string) {
  let obj = JSON.parse(response);

  
  let weather: string = obj.weather[0].description;
  let temp:number = obj.main.temp;

  // placeTxt.innerHTML = city;
  now_weather.innerHTML = weather;
  tempTxt.innerHTML = Math.round(temp) + '℃';
  // console.log(temp);

  // 天気によって背景画像を変更する
  switch (obj.weather[0].main) {
    case 'Clear':
      now.style.backgroundImage = 'url(' + weatherImages[0] + ')';
      break;
    case 'Clouds':
      now.style.backgroundImage = 'url(' + weatherImages[1] + ')';
      break;
    case 'Rain':
      now.style.backgroundImage = 'url(' + weatherImages[2] + ')';
      break;
    case 'Snow':
      now.style.backgroundImage = 'url(' + weatherImages[3] + ')';
      break;
    case 'Atmosphere':
      now.style.backgroundImage = 'url(' + weatherImages[4] + ')';
      break;
      case 'Thunderstorm':
      now.style.backgroundImage = 'url(' + weatherImages[5] + ')';
      break;
      case 'Drizzle':
      now.style.backgroundImage = 'url(' + weatherImages[6] + ')';
      break;
  }
  // 天気アイコンを取得して表示
  weatherIcon.src = "http://openweathermap.org/img/wn/" + obj.weather[0].icon + "@2x.png"
}})