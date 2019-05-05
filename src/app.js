const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geo = require(__dirname + "/geocode.js");
const fore = require(__dirname + "/forecast.js");
const app = express();
const publicDirectoryPath = path.join(__dirname,"../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.listen(3000 ,()=>{
  console.log("The server did start on port 3000");
});
app.use(express.static(publicDirectoryPath));
app.set("view engine", "hbs");
app.set("views",viewsPath);
hbs.registerPartials(partialsPath);

app.get("/",(req,res) => {
  res.render("index",{
    title: "Weather App",
    name: "Ahmed Sengab"
  });
});
app.get("/help",(req,res) => {
  res.render("help",{
    title: "help",
    helpText: "This is some helpfule text",
    name: "Ahmed Sengab"
  });
});
app.get("/products" , (req,res) => {
  if (!req.query.search)
  {
    return res.send({
      error: "You must provide a search term"
    });
  }
  res.send({
    products : [],
  });
});
app.get("/about",(req,res) => {
  res.render("about",{
    title: "About",
    name: "Ahmed Sengab"
  });
});
app.get("/weather",(req,res) => {
  if (!req.query.address)
  {
    return res.send({
      error: "Address not found"
    });
  }
  geo.geocode(req.query.address, (error, {latitude,longitude,location} = {}) => {
    if (error){
      return res.send({error});
    }
    fore.forecast(latitude,longitude,(error, forecastData) => {
      if (error) {
        return res.send({error});
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    });
  });
  /*res.send({
    forecast: "It is snowing",
    address: req.query.address,
    name: "Ahmed Sengab"
  });*/
});
app.get("/help/*",(req,res)=>{
  res.send("Help article not found");
});
app.get("*",(req,res)=>{
  res.render("404",{
    title: "404",
    name: "Ahmed Sengab",
    error: "Page Not found"
  });
});
