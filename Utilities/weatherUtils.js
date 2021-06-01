const axios = require('axios');

const Utils = require('./Utils');
// const Utils = new Utilities();
const { WEATHER_API_URL, WEATHER_ICON_URI, WEATHER_ICON_SIZE } = require('./constant');


const getWeatherByPlace = async (placeName) => {
    let place = placeName.toLowerCase();
    let url = `${WEATHER_API_URL`weather`}&q=${place}`;
    console.log(url);
    return axios.get(url).then(async (data) => {
        
        if(Utils.isNull(data.data)) throw new Error(`No Data found for ${placeName}`);

        // get forcast data from lat long
        const {lat, lon} = data.data.coord;
        const { daily } = await getDailyData(lat, lon);
        data.data.daily = daily

        data = getCleanData(data);
        // console.log(data)
        if(Utils.isNull(data)) throw new Error(`No Data found for ${placeName}`);
        
        return data;
    }).catch(err => {
        console.log(err)
        return {cod: 400};
    });
}

const getDailyData = (lat, lng) => {
    let url = `${WEATHER_API_URL`onecall`}&lat=${lat}&lon=${lng}&exclude=current,minutely,hourly,alerts`;
    // console.log(url)
    return axios.get(url).then(data => {
        if (Utils.isNull(data.data)) return;
        // console.log(data.data)
        return data.data;
    }).catch(err => err.response)
}

const schema = {
    cod: value => value === 200,
    weather: value => value.length > 0,
    main: value => !Utils.isNull(value),
}

const getCleanData = data => {
    data = data.data;
    let inValidKeys = Utils.validateObject(data, schema);
    if(inValidKeys.length>0) return;

    data = getPrettyObject(data);
    return data;
}

const getPrettyObject = data => {
    // setting weather icon from iconCode
    let weather = data.weather[0];
    let icon = weather.icon;
    weather.icon = `${WEATHER_ICON_URI}/${icon}@2x.png`;
    data.weather = weather;

    //setting temperature object
    let temperature = data.main;
    const celcius = {
        temp: Utils.kelvinToCelsius(temperature.temp),
        feels_like: Utils.kelvinToCelsius(temperature.feels_like),
        temp_min: Utils.kelvinToCelsius(temperature.temp_min),
        temp_max: Utils.kelvinToCelsius(temperature.temp_max),
    }
    const fahrenheit = {
        temp: Utils.celsiusToFeh(celcius.temp),
        feels_like: Utils.celsiusToFeh(celcius.feels_like),
        min: Utils.celsiusToFeh(celcius.temp_min),
        max: Utils.celsiusToFeh(celcius.temp_max),
    }
    temperature.celcius = celcius;
    temperature.fahrenheit = fahrenheit;

    data.main = temperature;
    // horizon date conversion
    // if(!Utils.isNull(data.sys)){
    //     data.sunrize = Utils.getCleanTime(data.sys.sunrise);
    //     data.sunset = Utils.getCleanTime(data.sys.sunset);
    //     data.horizonOffset = Utils.getHorizonOffset(data.sys.sunrise, data.sys.sunset)
    // }

    return data;
}

module.exports = { getWeatherByPlace }