const { execFile ,execSync , execFileSync , spawnSync} = require('child_process')

var title_array = process.argv[3];
var link_array = process.argv[3];
var Channel_ID = process.argv[2];


var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/mydb'
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
	if (err) throw err
	var dbo = db.db('input')

var channels_title= [{ channels_title: title_array,channels_link:link_array,update_timestamp: Math.floor((Date.now() / 1000)/60)}]

    var myobj = {Channel:Channel_ID,subscribed_channel_com: channels_title };

                    dbo.collection("channel_info").find({'id': Channel_ID }).toArray(function(err, data){
                        if(err){
                            console.log(err);
                            return
                        }
                      
                        if(data.length == 0) {

                            dbo.collection("channel_info").insert(myobj, function(err, res) {
                                if (err) throw err;
                                console.log("1 document inserted channel_info");
                                db.close();
                              });
                    
                            return
                        }
                        else {
                            
                            dbo.collection("channel_info").updateOne( { 'id': Channel_ID  },{ $push: { "subscribed_channel_com": {$each : channels_title} } });
                         
                        }
                        console.log(data[0].Channel);
                      
                    
                        db.close();
                      })

})
