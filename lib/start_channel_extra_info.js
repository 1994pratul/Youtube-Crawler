
const { execFileSync} = require('child_process')
 

var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/mydb'
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
	if (err) throw err
	var dbo = db.db('input')
	dbo.collection("comments_channel").find({}).toArray(function (err, result) 
	{ 
	//	var firstvid = result.length;

		
		// console.log( "Started : ---->",result.length)
		for (var i = 0; i < result.length; i++) {
		// console.log( "Started : ---->",result.videoList[i].id)
			//	 console.log( "Started : ---->",result[i].Video)
	     // console.log("-->",result.id)
			const child1 = execFileSync('node', ['./lib/channel/loyality_with_db.js', result[i].Channel])
		}
		 db.close();
	})
})
