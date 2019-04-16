var fs = require('fs')
var MongoClient = require('mongodb').MongoClient
var url = "mongodb://localhost:27017/"

channel_insert = function(){
	
	MongoClient.connect(url, { useNewUrlParser: true } , function(err, db) {
		if (err) throw err
		var dbo = db.db("input")
		var obj = JSON.parse(fs.readFileSync('./config/channelsdemotest.json', 'utf8'))
		dbo.collection('channel_list').insertOne({obj, updated: Math.floor((Date.now() / 1000)/60) },function(){
			db.close()	
		})
	})	
}

channel_insert();