
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){

    res.sendFile(__dirname +"/index.html");

});

app.post("/", function(req, res){

    const query = req.body.cityName;
    const apiKey = "8cbece613b4b5e95abe644ab124c2a99";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.render("result", {
                description : description,
                iconUrl : iconUrl,
                query : query,
                temp : temp
            });

        });
    });
});
app.post("/views/result", function(req, res){
    res.redirect("/");
})




app.listen(3000, function(){
    console.log("Server is started at port 3000.");
});