const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const Neo = require('./routing/Neo.js')
app.use('/neo', Neo)

app.get('/', (req, res) => {
    res.send({message: 'Puede consultar objetos cercanos a la tierra en un día en específico yendo a /neo/date o puede buscar en un rango de fecha con /neo/period/startDate-endDate. Para obtener más información diríjase a /neo'});
})

app.listen(port, () =>{
    console.log(`escuchando desde el puerto ${port}`)
})

