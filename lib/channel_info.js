var mongoUtil = require( './../config/key' );
var db = mongoUtil.getDb();
const cheerio = require('cheerio');
const request = require('request');
var result_get;
var final_results;
var id = "https://www.youtube.com/channel/"
var await= require('await');
var total_video_channel= require('./channel/total_video_channel.js');

exports.channel_info= function()
{   
           async function Database(){
            db.collection("channel_list").findOne({},async function(err, result) {
            if (err) throw err;
            result_get =  result;
            final_result= await result_get.obj;
            final_results = await final_result.map(a => id + a.id + "/about");
            call(final_results);
      });
    };
    
   async  function call(shit){
    
        for (i=0; i<=2;i++)
        {
            const body = await getBody(shit[i]);
            let $ = await cheerio.load(body);
            let title = await $('title').text();  
            let video_list = $('.yt-lockup-title').text();
            let related_channels = $('.branded-page-related-channels-list .yt-uix-sessionlink').text().replace(/\s+/g, " ");
    
            ///////////////////////-------------Inserting Channels into  database----------//////////////////////
            
            var myobj = {url:shit[i],Title:title,Total_videos:{Video_title:"",Video_link:""},Related_Channels:{Related_channel_title:"",Related_channel_link:""},created:new Date()};
            db.collection("channel_info").insertOne(myobj, function(err, res) {
            if (err) throw err;
          })
       }
       total_video_channel.total_video_channel();
    }Database();
    
    
    function getBody(url) {
        return new Promise((resolve, reject) => {
            request( url, function(err, res, body) {
                if (err) {
                    return reject(err);
                }
                resolve(body);
            });
        })
     } 
}