const request = require('postman-request')
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoib3BhbmtlciIsImEiOiJjbGZvY2t6ZnYwY2s3M3pwaHExNDFnMDUxIn0.80BggYnFClGGJOQbenGBEQ'

    request({url , json : true },(error, {body})=> {
        if(error){
            callback('Unable to connect to the server !! ', undefined) ;
        }else if(body.features.length === 0){
            callback('Unable to fetch the required location !! Try another search ...' , undefined) ;
        }else {
            // console.log(response.body.features[0]);
            callback(undefined , {
                latitude : body.features[0].center[1] ,
                longitude : body.features[0].center[0] ,
                place_name : body.features[0].place_name 
            })
        }
    })
}


module.exports = geocode ;

