const Utils = {
    isNull: value => value == null || value == undefined,
    validateObject: (object, schema) => Object.keys(schema)
                                            .filter(key => !schema[key](object[key]))
                                            .map(key => new Error(`${key} is invalid.`)),
    degToCompass: value => {
        compassVal = parseInt((value/22.5) + 0.5);
        arr=["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
        return arr[(compassVal % 16)];
    },
    kelvinToCelsius: kelvin => Math.round(kelvin - 275.15),
    celsiusToFeh: celsius => Math.round(Math.floor(celsius * (9/5) + 32)),
    getCleanTime: timestamp => {
        let date = new Date(timestamp*1000);
        let hour = (date.getHours() % 12) || 12;
        let meridian = (date.getHours() / 12) > 1 ? "PM" : "AM";
        return hour+":"+date.getMinutes() + meridian;
    },
    getHorizonOffset: (sunrise, sunset) => {
        current = Date.now()/1000;
        let horizon = sunset - sunrise;
        let currentPosition = current - sunrise;
        return Math.round(currentPosition / horizon * 100);
    },
}

module.exports = Utils;