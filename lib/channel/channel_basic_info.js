const request = require('request')
const channel = require('./channel_info')
var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/'
var channelLink = 'https://www.youtube.com/channel/'
var channelvid = require('./channel_videos_db.js')


exports.channelBasicInfo = () =>{

	MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
		if (err) throw err
		var dbo = db.db('input')
     
		dbo.collection('channel_list').findOne({}, async function (err, result) {
			if (err) throw err


			for (let i = 0; i < result.obj.length ; i++) {
				await channel.info (channelLink.concat(result.obj[i].id))
					.then(data => {
						dbo.collection('channel_info').insertOne(data, function(err, res) {
							if (err) throw err
						})})
					.catch(console.log)
			}
			channelvid.channelVideos()
			db.close()
		})
		
	})


	
}



