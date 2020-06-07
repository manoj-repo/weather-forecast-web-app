const request = require('request');


const forecast = (latitude,longitude,callback)=>{

   const url = 'http://api.weatherstack.com/current?access_key=e2a89dd76b11f3dc7a6d3466987f5fdf&query=' + latitude + ',' + longitude;
    
    

    request({url, json:true},(error,{body})=>{

        if(error)
        {
            callback('Unable to connect',undefined);
        }
        else if(body.error)
        {
            callback('Unable to find Location',undefined);
        }
        else
        {
            callback(undefined,`${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degree out. The humidity level is ${body.current.humidity} precent`);
            //callback(undefined,response.body.current)
        }

    })

}
module.exports = forecast;

 /*We have used hbs to render dynamic pages*/