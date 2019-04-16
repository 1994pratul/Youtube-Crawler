const cheerio = require('cheerio');
const request = require('request');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const { execFile ,execSync , execFileSync , spawnSync} = require('child_process')
var channel_id = process.argv[2];


var arr = new Array();
MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
  if (err) throw err;
  var dbo = db.db("input");
  var query = ({ "Channel": channel_id });
  dbo.collection("comments_channel").find(query).toArray(function (err, result) {
          result[0].comment.forEach(function(res)
           {
               author_link_data="https://www.youtube.com"+res.authorLink;
                request(author_link_data, function (error, response, html) {
                let $ = cheerio.load(html);
                var chId = author_link_data;
                 arr[chId] = new Array();
                 arr[chId]['title'] = new Array();
                 arr[chId]['link'] = new Array();
                 let related_channels_title = $('.branded-page-related-channels h3 a').attr('title',(j,val) =>{ arr[chId]['title'].push(val);}); 
                 let related_channels_link = $('.branded-page-related-channels h3 a').attr('href',(j,val) =>{ arr[chId]['link'].push(val); });
                  
                 var title_obj= JSON.stringify(arr[chId]['title']);
                 var link_obj= JSON.stringify(arr[chId]['link']);

                  if(title_obj != '[]')
                  {
                  const child = execFileSync('node', ['./lib/channel/insert_channel_db.js', channel_id , title_obj ,link_obj ])
                 }
              })

         db.close(); 
        })
  })
  
})
        