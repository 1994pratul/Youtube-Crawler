const { execFile ,execSync , execFileSync , spawnSync} = require('child_process');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


exports.channelVideos = () =>{
MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db("input");
  dbo.collection("channel_info").find({}).toArray(function(err, result) {
    if (err) throw err;
      for (var i = 0; i <result.length; i++) {
         console.log("Started --> ",result[i].id);    
      
      const child = execFileSync('node', ['./lib/channel/extract_channel_videos.js', result[i].id ])
     }

      db.close();
    });
  });


}