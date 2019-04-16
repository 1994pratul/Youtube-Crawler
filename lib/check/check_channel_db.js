var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/'
const exec = require('child_process').exec


function os_func() {
	this.execCommand = function(cmd, callback) {
		exec(cmd, (error, stdout, _stderr) => {
			if (error) {
				console.error(`exec error: ${error}`)
				return
			}

			callback(stdout)
		})
	}
}


MongoClient.connect(url, { useNewUrlParser: true } , function(err, db) {
	if (err) throw err
	var dbo = db.db('input')

	dbo.listCollections({name: 'channel_list'})
		.next(function(_err, collinfo) {
			if (collinfo) {
               
				db.close()	
			}
			else {
                
				var os = new os_func()
				os.execCommand('node ./lib/utility/channel_insert.js', function (_returnvalue) {
				})
				db.close()	
			}
		})


})	





