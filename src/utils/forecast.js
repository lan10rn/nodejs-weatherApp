const request = require('postman-request');
const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=0bfdb50fb269e586c9bcb23a586ddf71&query='+lat+','+long
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to the server !!',undefined);
        }else if(body.error){
            callback('Invalid Request made here !! \nType your query correctly',undefined);
        }else 
            callback(undefined , body);
    })
}

module.exports = forecast ;