"use strict";
// let selectedCityName = document.getElementById('selectedCityName')!;
var selectedCityName = document.querySelectorAll('.selectedCityName'); //クラス取得
var now_weather = document.getElementById('now_weather');
var weatherIcon = document.getElementById('weatherIcon');
var tempTxt = document.getElementById('tempTxt');
var now = document.getElementById('now');
var getWeatherBtn = document.getElementById('getWeatherBtn');
var targetCityId; // 現在の天気を取得する都道府県IDを格納する変数
var apiKey = 'bbd852dbef19eeeec1bde883e321c0bc'; //APIキー
// 背景画像を格納する配列
var weatherImages = [
    'image/sunny.jpg',
    'image/cloud.jpg',
    'image/rain.jpg',
    'image/snow.jpg',
    'image/atmosphere.jpg',
    'image/thunderstorm.jpg',
    'image/Drizzle.jpg'
];
selectedCityName.forEach(function (target) {
    target.addEventListener('click', function () {
        targetCityId = parseInt(target.getAttribute("data-value"));
        // console.log(targetCityId);
        var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?id=' + targetCityId + '&lang=ja' + '&units=metric' + '&appid=' + apiKey;
        // Ajax通信用のオブジェクトを作成
        var xhr = new XMLHttpRequest();
        //  通信方式とURLを設定
        xhr.open('GET', requestUrl);
        // 通信を実行する
        xhr.send();
        // 通信ステータスが変わったら実行される関数
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                ShowTodayWeather(xhr.responseText);
            }
        };
    });
    // 今日の天気を表示する
    function ShowTodayWeather(response) {
        var obj = JSON.parse(response);
        var weather = obj.weather[0].description;
        var temp = obj.main.temp;
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
        weatherIcon.src = "http://openweathermap.org/img/wn/" + obj.weather[0].icon + "@2x.png";
    }
});
