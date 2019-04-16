
const { execFile ,execSync , execFileSync , spawnSync} = require('child_process')
if (process.argv.length <= 2) {
    console.log("Usage: " + __filename + " SOME_PARAM");
    process.exit(-1);
}
 
var Channel_ID = process.argv[2];
 

var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/mydb'
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
	if (err) throw err
	var dbo = db.db('input')

dbo.collection("channel_info").findOne({'id': Channel_ID } , function(err, result) 
	{ 
	//	var firstvid = result.length;

		
	   var counter =  result.videoList.length
		for (var i = 0; i < counter; i++) {
	     console.log( "Started : ---->",result.videoList[i].id)
	     // console.log("-->",result.id)
		 const child = execFileSync('node', ['./lib/start_comments_channel_video_comments.js', result.videoList[i].id, result.id])
		 }
		 db.close();
	})
})
