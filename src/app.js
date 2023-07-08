const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { log } = require('console')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
//absolute path and relative path are things look em up 
// here we gonna use absolute path 
const port = process.env.PORT || 3000
// console.log(__dirname)
// console.log(__filename)
const pathToPublic = path.join(__dirname, '../public') // Static page path
const newviewspath = path.join(__dirname, '../templates/views') // Dynamic Page path
const partialspath = path.join(__dirname, '../templates/partials')

const app = express()
app.set('view engine', 'hbs')
app.set('views', newviewspath);
app.use(express.static(pathToPublic))
hbs.registerPartials(partialspath)
//---------as we are using static page then the root get call isn't required ---------------- so we can comment them out 
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Page',
        name: 'Abhinav Kumar Chaudhary'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Abhinav Chaudhary'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        help: 'No article is contributed here',
        name: 'Abhinav Chaudhary'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Abhinav Chaudhary'
    })
})
app.get('/product', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term !!"
        })
    }
    res.send('<h3><i>You searched for : </i></h3>' + req.query.search)
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide a search term !!"
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData.current.weather_descriptions,
                location: forecastData.location.name,
                address: req.query.address
            })
        })
    })
    // res.send({
    //     location: req.query.search
    // })
})
//Match anything that has'nt been matched yet 
app.get('*', (req, res) => {
    res.render('404', {
        message: 'Nothing to be found here',
        name: 'Abhinav Kumar '
    })
})
// app.get('/help' , (req,res)=>{
//     res.send('This is help page !')
// })

// app.get('/about' , (req,res)=>{
//     res.send('<h1><i>This is about page !</i></h1>')
// })


app.listen(port, () => {
    console.log('Port is up and running at ' + port)
})

//Lec-3 was all about serving static whole page as asset 