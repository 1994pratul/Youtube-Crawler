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
			var main_comment_count =  res.comment.length ;
			for (var x in res.comment) 
			{
                
				if (res.comment[x].creatorLikeHeart == undefined)
				{
					main_comment_count--;

              
				}
          
			}
			console.log(main_comment_count);
			var query = { "videos.videoId": videoid };
			var update = {  "$set": {"videos.$.creatorCommentLikeCount": main_comment_count }}
			dbo.collection("video_info").findOneAndUpdate(query ,update)          
                

			db.close();

           
		})
	});
}); 