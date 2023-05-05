import { Connection } from "mysql";
// var con = sql.createConnection({
//     host: "sql12.freemysqlhosting.net",
//     user: "sql12616165",
//     password: '9zaLtULG7L',
//     database:'sql12616165',
//     port:3306,
//   });
function returndata(){
  con.connect(function(err) {
    if (err) throw err;
    var sql_fetch = "SELECT * FROM bitcoin_data";
        con.query(sql_fetch, function (err, result, fields) {
            if (err) throw err;
            for(var i=0;i<11;i++){
                var result_data = [];
                var data ={
                        title : result[i].name,
                    last_item : result[i].last,
                    buy_item : result[i].buy,
                    sell_item : result[i].sell,
                    volume_item : result[i].volume,
                base_unit_item : result[i].base_unit,
                }
                result_data.push(data);
                return result_data;
            }
            });

});
}
export var data = returndata();