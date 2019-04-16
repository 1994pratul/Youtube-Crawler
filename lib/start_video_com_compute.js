
const { execFile ,execSync , execFileSync , spawnSync} = require('child_process')
// if (process.argv.length <= 2) {
//     console.log("Usage: " + __filename + " SOME_PARAM");
//     process.exit(-1);
// }
 
var Channel_ID = process.argv[2];
//var Channel_ID = "UCybgiy9tNNDlIWgBECgawKQ" ;

var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/mydb'
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
	if (err) throw err
	var dbo = db.db('input')

dbo.collection("comments_videos").findOne({'Channel': Channel_ID } , function(err, result) 
	{ 
	//	var firstvid = result.length;
	  //   console.log( "Started : ---->", result.videos[i].Video)
	     // console.log("-->",result.id)
   // console.log("-->",result)
	 //  var counter =  result.videos.length


		 if (result != null )
		 {
			 for (var i = 0; i < result.length; i++) {
			  console.log("Started -->",result[i].Channel)
			   const child = execFileSync('node', ['./lib/start_video_com_compute.js', result[i].id])
			 } 
			 
			 
		 }
			 db.close();
			
 











		 
	})
})
