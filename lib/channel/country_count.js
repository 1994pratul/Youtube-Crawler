const cheerio = require('cheerio');
const request = require('request');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var ChannelID = process.argv[2];
var arr=[];
var result_country = {}
var all_country_list=["Argentina", 
  "Australia",
  "Austria",
  "Belgium",
  "Bolivia",
  "Brazil",
  "Canada",
  "Chile",
  "Colombia",
  "Costa Rica",  
  "Denmark",
  "Dominican Republic",  
  "Ecuador",  
  "El Salvador", 
  "Finland",
  "France",
  "Germany",
  "Guatemala",  
  "Honduras",  
  "India", 
  "Ireland",
  "Italy",
  "Japan",
  "Luxembourg",
  "Mexico",
  "The Netherlands",
  "New Zealand",
  "Nicaragua",  
  "Norway",
  "Panama",  
  "Paraguay",
  "Peru",
  "Portugal",
  "Russia",
  "South Africa",  
  "South Korea",
  "Spain",
  "Sweden",
  "Switzerland",
  "Ukraine",
  "The United Kingdom",
  "United States",
  "Uruguay" ];
all_country_list.forEach(function(item) {
  result_country[item] = 0
})


MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
if (err) throw err;
var dbo = db.db("input");
var query = ({ "Channel": ChannelID });

dbo.collection("comments_channel").find(query).toArray(function (err, result) {
    result.forEach(function(res)
    {

      res.comment.forEach(function(result)
        {
            author_link_data="https://www.youtube.com"+result.authorLink+"/about";
            request(author_link_data, function (error, response, html) {
            let $ = cheerio.load(html);
            let country_list = $('.country-inline').text();
           
            if (country_list != ''){
            user_country=country_list.trim();
              arr.push(user_country);
               arr.forEach(function(item) {
              if(result_country.hasOwnProperty(item)) {
                result_country[item]++
              }
          })
          var query = { "id": ChannelID } ;
          var update = {  "$set": {"country_count": result_country , "update_timestamp": Math.floor((Date.now() / 1000)/60)}}
           dbo.collection("channel_info").findOneAndUpdate(query ,update)
           db.close();
          
          }
        

       })
        })
  

    }
  )
})
})