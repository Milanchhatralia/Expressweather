const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

const WEATHER_API_URL = requestName => `http://api.openweathermap.org/data/2.5/${requestName}?appid=${WEATHER_API_KEY}`;
const WEATHER_ICON_URI = 'http://openweathermap.org/img/wn';
const WEATHER_ICON_SIZE = '2x';

module.exports = {
    WEATHER_API_URL,
    WEATHER_ICON_URI,
    WEATHER_ICON_SIZE,
}