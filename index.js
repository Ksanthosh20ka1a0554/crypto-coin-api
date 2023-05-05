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
            var con = mysql.createConnection({
                host: "sql12.freemysqlhosting.net",
                user: "sql12616165",
                password: '9zaLtULG7L',
                database: 'sql12616165',
                port: 3306,
            });
            con.connect(function (err) {
                if (err) throw err;
                console.log("Connected!");
                for (var i = 0; i < 11; i++) {
                    var index = result[i];
                    var name_value = apiData[index].name;
                    var last_value = apiData[index].last;
                    var buy_value = apiData[index].buy;
                    var sell_value = apiData[index].sell;
                    var volume_value = apiData[index].volume;
                    var base_unit_value = apiData[index].base_unit;
                    //console.log(name_value,last_value,buy_value,sell_value,volume_value,base_unit_value);
                    //var sql=`INSERT INTO bitcoin_data(name, last, buy, sell, volume, base_unit) VALUES ('${name_value}','${last_value}','${buy_value}','${sell_value}','${volume_value}','${base_unit_value}')`;
                    //var sql_upadate=`UPDATE bitcoin_data SET last='${last_value}',buy='${buy_value}',sell='${sell_value}',volume='${volume_value}',base_unit='${base_unit_value}' WHERE name='${name_value}'`;
                    //con.query(sql_upadate, function (err, result) {
                    //    if (err) throw err;
                    //    console.log("1 record updated");
                    //  });

                }
                
                var sql_fetch = "SELECT * FROM bitcoin_data";
                con.query(sql_fetch, function (err, result, fields) {
                    if (err) throw err;

                    for (var i = 0; i < 10; i++) {
                        var data = {
                            title: result[i].name,
                            last_item: result[i].last,
                            buy_item: result[i].buy,
                            sell_item: result[i].sell,
                            volume_item: result[i].volume,
                            base_unit_item: result[i].base_unit,
                        }
                        result_data.push(data);
                        
                    }
                    res.render('list',{bitcoin_data:result_data});
                    
                });

                
            });

            
        });
        
    });
    
    

});









app.listen(3000);
