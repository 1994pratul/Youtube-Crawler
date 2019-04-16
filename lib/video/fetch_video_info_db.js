var fetchVideoInfo = require('./extract_video_info');


const chaId= process.argv[3];
const vidId = process.argv[2];
fetchVideoInfo(vidId).then(function (videoInfo) {



	console.log(videoInfo.channelId);

	var MongoClient = require('mongodb').MongoClient
	var url = 'mongodb://localhost:27017/';
	
	MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
	  if (err) throw err
	  var dbo = db.db('input')

		Channel_ID = chaId ;
	


		videoInfo.id = vidId ;
		videoInfo.update_timestamp = Math.floor((Date.now() / 1000)/60) ;
		var myobj = { Channel: Channel_ID , videos: [videoInfo]}

 
		dbo.collection('video_info').find({'Channel': Channel_ID }).toArray(function(err, data){
			if(err){
				console.log(err)
				return
			}
			if(data.length == 0) {
				dbo.collection('video_info').insertOne(myobj, function(err, res) {
					if (err) throw err
					console.log('1 document inserted')
					db.close()
				})
				return
			}
			else {
				dbo.collection('video_info').updateOne( { 'Channel': Channel_ID },{ $push: { 'videos': videoInfo } })
				console.log('1 document Pushed ')
				db.close()
			}
			

		})

	})


});