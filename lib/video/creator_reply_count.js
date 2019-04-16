
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var videoid = process.argv[2];
var channel_id = process.argv[2];
MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
	if (err) throw err;
	var dbo = db.db("input");
	var query = ({ "Video": videoid });

	dbo.collection("comments_by_video").find(query).toArray(function (err, result) {
        
    result.forEach(function(comments)
    {
        com_data=comments.comment;
        com_data.forEach(function(comments_data)
        {
            author_url=comments_data.authorLink;
            var count = 0;
            if ( comments_data.hasReplies === true )
            {
                comments_data= comments_data.replies;
                comments_data.forEach(function(output)
                {
                   authors= output.authorLink.split("/");
                   authors=authors[2];
                   if(authors==channel_id)
                   {
                       count=count+1;
                       var query = { "videos.videoId": videoid } ;
                       var update = {  "$set": {"videos.$.creator_reply_count": count }}
                       dbo.collection("video_info").findOneAndUpdate(query ,update)
                       db.close();
                       
                   }
                })

            }
       
        })
    });
        

	});
}); 
