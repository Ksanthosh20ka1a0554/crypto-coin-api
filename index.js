const express = require('express');
const https = require('https');
var mysql = require('mysql');


const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

var result_data = [];

app.get('/', function (req, res) {

    const url = 'https://api.wazirx.com/api/v2/tickers';

    https.get(url, (response) => {
        let data = '';
        response.on('data', (chunk) => {
            data += chunk;
        });
        response.on('end', () => {
            const apiData = JSON.parse(data);
            var result = [];
            for (var i = 0; i < 11; i++) {
                result.push(Object.keys(apiData)[i]);
            }
            
             for (var i = 0; i < 11; i++) {
                    var index = result[i];
                    var name_value = apiData[index].name;
                    var last_value = apiData[index].last;
                    var buy_value = apiData[index].buy;
                    var sell_value = apiData[index].sell;
                    var volume_value = apiData[index].volume;
                    var base_unit_value = apiData[index].base_unit;
                    var data = {
                            title: apiData[index].name,
                            last_item: apiData[index].last,
                            buy_item: apiData[index].buy,
                            sell_item: apiData[index].sell,
                            volume_item: apiData[index].volume,
                            base_unit_item: apiData[index].base_unit,
                        }
                        result_data.push(data);
                        
                }
                res.render('list',{bitcoin_data:result_data});
            
        });
        
    });
    
    

});









app.listen(3000);
