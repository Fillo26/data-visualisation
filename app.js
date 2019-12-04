const express = require("express");
const request = require("request");
const csv = require('csvtojson');
let fs = require('fs');
let app = express();
let jsonData;
let cors = require('cors');
let urlData = 'https://kod.brno.cz/dataset/862b83e0-54a1-4851-80e9-0976c9ce3648/resource/7fe093d2-942d-40bf-8287-f7bcda8e0eb5/download/pocet-absolventu-vs_1.csv';

app.use(cors());
app.use('/public', express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname +  '/index.html');
});

request(urlData, function (err, response, body) {
    if (err)
        console.log('error: ', error);
    else{
        const buffer = Buffer.from(body, 'utf8');
        fs.writeFileSync('test.csv', buffer);
        csv()
            .fromFile('test.csv')
            .then((jsonObj)=>{
                jsonData = jsonObj;
                console.log(jsonData);
            });
    }
});

app.get('/graph', function (req, res) {
    res.send(jsonData);
});

app.listen(3001, function () {
    console.log("Server is running")
});