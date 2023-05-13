const express = require('express');
const https = require('https');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', async (req, res) => {
  const url = 'https://api.wazirx.com/api/v2/tickers';
  
  try {
    const apiResponse = await fetch(url);
    const apiData = await apiResponse.json();
    
    const resultData = Object.entries(apiData)
      .slice(0, 11)
      .map(([key, value]) => ({
        title: value.name,
        last_item: value.last,
        buy_item: value.buy,
        sell_item: value.sell,
        volume_item: value.volume,
        base_unit_item: value.base_unit
      }));
      
    res.render('list', { bitcoin_data: resultData });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
