var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var final_result_arr = [];
var resultCount = [];

var Channel_ID = "UC8RznNwVOa3lzTlnZLtz09A";


MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("input");
    var query = ({ "Channel": Channel_ID });

    dbo.collection("comments_channel").find(query).toArray((err, result) => {
        if (err) throw err;
        for (x = 0; x < result[0].comment.length; x++) {
            all_comments = result[0].comment[x];
            final_result_arr.push(all_comments);

            var uniqueNames = [];
            for (i = 0; i < final_result_arr.length; i++) {
                if (uniqueNames.indexOf(final_result_arr[i].authorLink) == -1) {
                    uniqueNames.push(final_result_arr[i].authorLink);
                }
            }
        }

       

        var count = 0;
            for (var x = 0; x < uniqueNames.length; x++) {
                for (var y = 0; y < final_result_arr.length; y++) {
                    if (uniqueNames[x] == final_result_arr[y].authorLink) {
                        count++;
                    }
                }
                resultCount.push(
                   count
                );
                count = 0;
                
            }


const math = require('./math.js')
var ints = resultCount;
var result = []

ints.sort((a, b) => a - b)

console.log('Len:', ints.length)

function chunkArray(iArray, chunk_size) {
	var results = []

	while (iArray.length) {
		results.push(iArray.splice(0, chunk_size))
	}
	return results
}
var factor = 4

var total = {
	arr: ints,
	min: math.min(ints),
	max: math.max(ints),
	avg: math.mean(ints),
	median: math.median(ints),
}

const indexing = (buff, indexLength, factor) => {
	result = chunkArray(ints, ((indexLength + buff) / factor))
}

var buff = ints.length % factor
var indexLength = ints.length

indexing(buff, indexLength, factor)

var loyaltyList = {}
for (var i = 1; i < (factor + 1); i++) {
	loyaltyList[i] = {
		arr: result[i - 1],
		min: math.min(result[i - 1]),
		max: math.max(result[i - 1]),
		avg: math.mean(result[i - 1]),
		median: math.median(result[i - 1]),
	}
}
var temp = loyaltyList[2].arr
temp.concat(loyaltyList[3].arr)

var middle = {
	arr: temp,
	min: math.min(temp),
	max: math.max(temp),
	avg: math.mean(temp),
	median: math.median(temp),
}
var update = {  "$set": { total_loyalty  : total , fragment_loyalty_list : loyaltyList ,  update_timestamp : Math.floor((Date.now() / 1000)/60)} }
dbo.collection("channel_info").findOneAndUpdate(query ,update)


dbo.collection("channel_info").findOneAndUpdate( { 'id': Channel_ID  },update);
 db.close();
        
   });


   
});