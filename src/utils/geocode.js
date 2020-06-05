const request = require('request');


const geocode = (address,callback)=>{

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibWFub2oxMDEiLCJhIjoiY2thbmF3Z3IyMDMwaDJ5bnlhdThsbmVjYiJ9.rGXPY9FCx4wLlUOfcx8rAg&limit=1'

    request({url, json: true},(error,{body})=>{

        if(error)
        {
            callback('Unable to Connect to Loaction Services',undefined);
        }
        else if(body.features == 0)
        {
            callback('Unable to find the location');
        }
        else
        {
           callback(undefined,{

            //  latitude : response.body.features[0].center[1],
            //  longitude : response.body.features[0].center[0],
            //  location : response.body.features[0].place_name,

            latitude : body.features[0].center[1],
            longitude :body.features[0].center[0],
            location : body.features[0].place_name,


           });
        }

    })

}


module.exports = geocode;