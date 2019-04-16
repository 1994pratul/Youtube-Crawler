const Task = require('data.task')
const scrapeComments = require('./fetch/fetch-comments')
const fs = require('fs')

const collapseReplies = require('./utility/collapse-replies')

var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/'
const json = require('./utility/json')
var video_links

const scrapeAllComments = (videoId, pageToken, fetched = []) =>
	scrapeComments(videoId, pageToken)
		.chain(
			({ comments, nextPageToken }) =>
				(nextPageToken
					? scrapeAllComments(videoId, nextPageToken, fetched.concat(comments))
					: Task.of(fetched.concat(comments)))
		)
		.rejectedMap(e => (e ? e.message || e : 'Scraping failed'))

const writeToStdout = data => {
	

	var MongoClient = require('mongodb').MongoClient
	var url = 'mongodb://localhost:27017/'
	
	MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
	  if (err) throw err
	  var dbo = db.db('input')


	  var data_channel = data ;


	  var video_comment =  { Video : Video_ID , comments : data , update_timestamp: Math.floor((Date.now() / 1000)/60)};
  
	  var myobj = { Channel: Channel_ID , videos : [ video_comment]}
  
	  var myobj_channel = { Channel: Channel_ID , comment : data_channel }

	  var myobj_video = { Video : Video_ID , comment : data_channel }
   
   dbo.collection("comments_videos").find({'Channel': Channel_ID }).toArray(function(err, data){
	  if(err){
		  console.log(err);
		  return
	  }
	
	  if(data.length == 0) {
		  dbo.collection("comments_videos").insert(myobj, function(err, res) {
			  if (err) throw err;
			  console.log("1 document inserted");
			  db.close();
			});
  
			dbo.collection("comments_channel").insert(myobj_channel, function(err, res) {
			  if (err) throw err;
			  console.log("1 document inserted comments_channel");
			  db.close();
			});
  

			dbo.collection("comments_by_video").insert(myobj_video, function(err, res) {
				if (err) throw err;
				console.log("1 document inserted comments_video");
				db.close();
			  });


		  return
	  }
	  else {
		  dbo.collection("comments_videos").updateOne( { 'Channel': Channel_ID  },{ $push: { "videos": video_comment } });
		  dbo.collection("comments_channel").updateOne( { 'Channel': Channel_ID  },{ $push: { "comment": {$each : data_channel} } });
		  dbo.collection("comments_by_video").insert(myobj_video, function(err, res) {
			if (err) throw err;
			console.log("1 document inserted comments_video");
			db.close();
		  });

	  }
  


	  console.log(data[0].Channel);
	
  
	  db.close();
	})
   
   
 
	})

	return data
}
module.exports = ({ videoId, opts }) =>
	scrapeAllComments(videoId)
		.map(
			comments =>
				(opts.collapseReplies
					? comments.reduce((acc, c) => acc.concat(collapseReplies(c)), [])
					: comments)
		)
		.chain(opts.outputFile ? writeToFile(opts) : x => Task.of(x))
		.map(opts.stdout ? writeToStdout : x => x)
  
