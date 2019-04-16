//////////////////////-------------------------Code--------------//////////////////////////////////////////////////////////////////
var mongoUtil = require( './../config/key' )
var db = mongoUtil.getDb()
var fetchVideoDetails = require('./video/videoinfo.js')
var comments= require('./comments.js')
exports.videoinfo= function(){

	db.collection('channel_info').find().forEach(function (res) {
		var video_links = res.Total_videos.Video_link
		if (video_links != '[]') {
			var video_links_data = JSON.parse(video_links)
			for(var i=0;i<=video_links_data.length-1; i++){
				if(video_links_data[i]!='"[]"')
				{
					var links=video_links_data[i].split('=')
					var videoId=links[1]
					fetchVideoDetails(videoId, function (err, videoInfo) {
						if (err) throw new Error(err)
						////////////////////////////////////////////////////////////////////////////////
						var myobj = {videoinfo: videoInfo,created: new Date()}
						db.collection('video_info').insertOne(myobj, function(err, res) {
							if (err) throw err
							// console.log("1 document inserted");
						})
					})
				}
			}    
		}
	})
	comments.comments() 
}
