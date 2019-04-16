
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var final_result=[];

var videoid = process.argv[2];
MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
	if (err) throw err;
	var dbo = db.db("input");
	var query = ({ "Video": videoid });

	dbo.collection("comments_by_video").find(query).toArray(function (err, result) {
		result.forEach(function(res)
		{
			var comment=res.comment;
			var json = [] = comment;
			json.sort(function(a, b){
				return  b.likes - a.likes ;  
			});
			var query = { "videos.videoId": videoid } ;
			var update = {  "$set": {"videos.$.Popular_Comments": json }}
			dbo.collection("video_info").findOneAndUpdate(query ,update)
			db.close();
		})
	});
}); 