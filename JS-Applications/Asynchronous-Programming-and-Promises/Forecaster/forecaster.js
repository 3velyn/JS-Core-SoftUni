function attachEvents() {
    const baseUrl = 'https://judgetests.firebaseio.com/';
    const weatherSymbols = {
        'Sunny': '&#x2600;',
        'Partly sunny': '&#x26C5;',
        'Overcast': '&#x2601;',
        'Rain': '&#x2614;',
    };

    $('#submit').on('click', getLocation);
    
    async function getLocation() {
        try {
            let allLocations = await $.ajax({
                method: 'GET',
                url: baseUrl + 'locations/.json',
            });
            let $town = $('#location').val();
            let code = allLocations.filter(t => t.name === $town)[0].code;
            getWeather(code);
        } catch (e) {
            console.log(e);
        }
    }

    async function getWeather(code) {
        try {
            let locationTodayWeather = await $.get({
                url: baseUrl + `forecast/today/${code}.json`
            });
            let locationUpcomingWeather = await $.get({
                url: baseUrl + `forecast/upcoming/${code}.json`
            });
            $('#forecast').show();
            showCurrentWeather(locationTodayWeather);
            showUpcomingWeather(locationUpcomingWeather);
        } catch (e) {
            console.log(e);
        }
    }

    function showCurrentWeather(todayWeather) {
        let $currentDiv = $('#current');
        let $symbolSpan = $('<span class="condition symbol">' + `${weatherSymbols[todayWeather.forecast.condition]}` + '</span>');
        let $conditionSpan = $('<span class="condition"></span>');
        let forecastData = {
            'name': todayWeather.name,
            'degrees': `${todayWeather.forecast.low}&#176;/${todayWeather.forecast.high}&#176;`,
            'condition': `${todayWeather.forecast.condition}`
        };

        $currentDiv.append($symbolSpan);
        $currentDiv.append(createForecastData($conditionSpan, forecastData));
    }

    function showUpcomingWeather(upcomingWeather) {
        let $upcomingDiv = $('#upcoming');
        
        for (const upcomingWeatherElement of upcomingWeather.forecast) {
            let $upcomingSpan = $('<span class="upcoming"></span>');
            let $symbolSpan = $('<span class="symbol">' + `${weatherSymbols[upcomingWeatherElement.condition]}` + '</span>');
            let forecastData = {
                'degrees': `${upcomingWeatherElement.low}&#176;/${upcomingWeatherElement.high}&#176;`,
                'condition': `${upcomingWeatherElement.condition}`
            };

            $upcomingSpan.append($symbolSpan);
            $upcomingDiv.append(createForecastData($upcomingSpan, forecastData));
        }
    }
    
    function createForecastData(span, data) {
        for (const forecastDatum of Object.values(data)) {
            let $forecastDataSpan = $('<span class="forecast-data">' + `${forecastDatum}` + '</span>');
            span.append($forecastDataSpan);
        }
        return span;
    }
}