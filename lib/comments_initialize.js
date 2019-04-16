const { execFile ,execSync , execFileSync , spawnSync} = require('child_process')

var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/mydb'
MongoClient.connect(url, function(err, db) {
	if (err) throw err
	var dbo = db.db('admin')
	dbo.collection('video_info').find().forEach( function(res) 
	{ 
		var video_links= res.videoinfo.videoId
		var channel_id=res.videoinfo.channelId
		if(video_links!= '[]'){
                
							 VID=video_links
							 CID=channel_id
							 const child = execFileSync('node', ['comments.js', VID,CID])
		}
	})
})
