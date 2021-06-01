const router = require("express").Router();
const {getWeatherByPlace} = require('../Utilities/weatherUtils');

router.get('/', function(req, res) {
    res.json(
        { 
            info: 'Get the weather data by place name.',
            routes: '/api/<cityname>/',
        });   
});

router.get('/:cityname', async function(req, res) {
    const cityName = req.params.cityname;
    const weatherObj = await getWeatherByPlace(cityName);
    res.end(JSON.stringify(weatherObj));
});

module.exports = router;