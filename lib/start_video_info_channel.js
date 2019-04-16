const { execFile ,execSync , execFileSync , spawnSync} = require('child_process')

var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/mydb'
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
	if (err) throw err
	var dbo = db.db('input')
	dbo.collection("channel_info").find({}).toArray(function(err, result) 
	{ 
		 for (var i = 0; i < result.length; i++) {
			 console.log("Started -->",result[i].id )
			const child = execFileSync('node', ['./lib/start_video_info_channel_video.js', result[i].id])
			  db.close();
		 }
	})
})
