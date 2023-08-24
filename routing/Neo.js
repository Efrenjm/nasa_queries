const express = require('express');
const router = express.Router();
const url = 'https://api.nasa.gov/neo/rest/v1/feed?';
const fs = require('fs')
let key;

fs.readFile('api_key.txt', (err, input) => {
    if (err) throw err;
    key = input.toString();
})

router.get('/', (req, res) => {
    res.json({message:'Para obtener información de objetos cercanos a la tierra consulte la fecha en el formato: YYYY.MM.DD. Si desea un período en particular, puede utilizar period/YYYY.MM.DD-YYYY.MM.DD'});
})

    //-------------------------------//
    //---- BÚSQUEDA INDIVIDUAL ------//
    //-------------------------------//
router.get('/:year.:month.:day', (req, res)=>{
    const date = `${req.params.year}-${req.params.month}-${req.params.day}`
   
    fetch(url + new URLSearchParams({
        start_date : date,
        end_date : date,
        api_key : key
    }))
    .then((response) => response.json())
    .then((data)=>{

        let objects = [];
        for (obj of data.near_earth_objects[date]){
            objects.push({
                id : obj.id,
                nombre : obj.name,
                magnitud_absoluta_h : obj.absolute_magnitude_h,
                diametro_estimado_km : `${obj.estimated_diameter.kilometers.estimated_diameter_min} - ${obj.estimated_diameter.kilometers.estimated_diameter_max}`,
                amenaza_potencial : (obj.is_potentially_hazardous_asteroid ? "Si" : "No"),
                hora_estimada : obj.close_approach_data[0].close_approach_date_full.split(' ')[1],
                velocidad_relativa_kmph : obj.close_approach_data[0].relative_velocity.kilometers_per_hour,
            })
        }

        response = {
            Fecha: date,
            Total_de_objetos : data.element_count,
            Objetos : objects,
        }
        res.send(response)
    })
    .catch(error => {
        console.error('Error: ', error);
    });
})


    //-------------------------------//
    //---- BÚSQUEDA POR PERIODO -----//
    //-------------------------------//
router.get('/period/:yeari.:monthi.:dayi-:yearf.:monthf.:dayf', (req, res,next) => {
    const startDate = `${req.params.yeari}-${req.params.monthi}-${req.params.dayi}`
    const endDate = `${req.params.yearf}-${req.params.monthf}-${req.params.dayf}`
    console.log(url + new URLSearchParams({
        start_date : startDate,
        end_date : endDate,
        api_key : key
    }))
    fetch(url + new URLSearchParams({
        start_date : startDate,
        end_date : endDate,
        api_key : key
    }))
    .then((response) => response.json())
    .then((data)=>{

        let day =[]

        for ( let date of Object.keys(data.near_earth_objects).sort() ){

            let objects = [];

            for ( obj of data.near_earth_objects[date] ){

                let approx = [];
                for( approximations of obj.close_approach_data){
                    approx.push({
                        fecha_de_aproximacion : approximations.close_approach_date,
                        hora_estimada : approximations.close_approach_date_full.split(' ')[1],
                        velocidad_relativa_kmph : approximations.relative_velocity.kilometers_per_hour,
                    })
                }

                objects.push({
                    id : obj.id,
                    nombre : obj.name,
                    magnitud_absoluta_h : obj.absolute_magnitude_h,
                    diametro_estimado_km : `${obj.estimated_diameter.kilometers.estimated_diameter_min} - ${obj.estimated_diameter.kilometers.estimated_diameter_max}`,
                    amenaza_potencial : (obj.is_potentially_hazardous_asteroid ? "Si" : "No"),
                    aproximaciones : approx,
                })
            }

            let mid = {}
            mid[date] = objects
            day.push(mid)

        }

        response = {
            Rango_de_fechas : `${startDate} - ${endDate}`,
            Total_de_objetos : data.element_count,
            Objectos_por_dia : day
        }
    
        res.send(response)
    })
    .catch(error => {
        res.send('Error: ', error);
    });



})

module.exports = router