const { execFile ,execSync , execFileSync , spawnSync} = require('child_process')

var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/mydb'
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
	if (err) throw err
	var dbo = db.db('input')
	dbo.collection("comments_videos").find({}).toArray(function(err, result) 
	{ 

		console.log(result.length);

		 for (var i = 0; i < result.length; i++) {
			 console.log("Started -->",result[i].Channel)
		 	const child = execFileSync('node', ['./lib/channel/country_count.js', result[i].Channel])
			 }
		 db.close();
	})
})
