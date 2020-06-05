const path = require('path');       // core module
const geocode = require('./utils/geocode')
const forecast = require('./utils/forcast');
const express = require('express'); // npm module
const hbs = require('hbs');


// console.log(__dirname);
// console.log(path.join(__dirname,'../public'));

const app = express(); // load or generate the express sever

//define paths for experess config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewPath = path.join(__dirname,'../template/views');
const partialPath = path.join(__dirname,'../template/partials')

//set up handlebars engine and views engine
app.set('views',viewPath);
app.set('view engine','hbs') // is use to set a value to the given express setting and we need to tell express which handler we are using
hbs.registerPartials(partialPath);

//setup static directory to serve // use is used to custommize the express server
app.use(express.static(publicDirectoryPath));  


app.get('',(req,res)=>{
    res.render('index',{
        title : 'Weather',
        name : 'Manoj Salian'

    }) // render allows us to render views
})

app.get('/about',(req,res)=>{
    res.render('about', {
        title : 'About Us Page',
        name : 'Manoj Salian'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title : 'Help Portal',
        msg : 'We are here to help u',
        name : 'Manoj Salian'
    })
})

app.get('/weather', (req,res)=>{

    if(!req.query.address)
    {
        return res.send({
            error : 'Please provide with an address'
        })
    }
    let address = req.query.address;
    geocode(address,(error,{latitude, longitude, location} = {} )=>{

        if(error)
        {
            return res.send({
                error
            })
        }
        forecast(latitude,longitude, (error, forecastData) => {
    
            if(error)
            {
                return res.send({
                    error
                })
            }
            res.send({
                location,
                forecast : forecastData,
                address 
            });
           
          })
    
    });

})

app.get('/products',(req,res)=>{
    if(!req.query.search)
    {
        return res.send({
            error : 'Please enter a search result'
        })
    }

    res.send({
        product :[]
    })
    
})

app.get('/help/*',(req,res)=>{
    res.render('404', {
        title : 404,
        name : 'Manoj Salian',
        errorMsg : 'Help article not found'
    })
})

app.get('*',(req,res)=>{

    res.render('404', {
        title : 404,
        name :'Manoj Salian',
        errorMsg : 'Page not found'
    })
})


app.listen(3000, ()=>{
    console.log('The web server is up running on port 3000');
})