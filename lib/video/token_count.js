var MongoClient = require('mongodb').MongoClient;
const { KMR, KKMA } = require('koalanlp/API');
const { initialize } = require('koalanlp/Util');
const { Tagger, Parser } = require('koalanlp/proc');
let user = new Object();

var resultCount = [];
var videoid = process.argv[2];

var url = "mongodb://localhost:27017/";
MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("input");
    var query = ({ "Video": videoid });
    dbo.collection("comments_by_video").find(query).toArray(function (err, result) {
        if (err) throw err;
        var final_result_arr = [];
        var all_comments = [];
        for (x = 0; x < result[0].comment.length; x++) {
            all_comments = result[0].comment[x].text;
            final_result_arr.push(all_comments);


        }
        var nngTokens = [];

        initialize({
            packages: {
                KMR: '2.0.4',
                KKMA: '2.0.4'
            },
            verbose: true
        })
            .then(() => {  
                var testing = final_result_arr;
                for (var i = 0; i < testing.length; i++) {
                    let text = testing[i];
                    let parser = new Parser(KKMA);
                    let parsed = parser.analyzeSync(text);

                    for (const sent of parsed) {
                        for (const dep of sent.dependencies) {

                            var token = dep.toString().split(" ");
                            for (let i = 0; i < token.length; i++) {
                                if (token[i].length > 0) {
                                    var tempToken = token[i];
                                    var splitArray = tempToken.split('/NNG');
                                    if (splitArray.length > 1) {
                                        nngTokens.push(splitArray[0]);
                                    }

                                }

                            }
                        }
                    }
                }

                var uniqueArray = nngTokens.filter(function (elem, pos) {
                    return nngTokens.indexOf(elem) == pos;
                })

                var count = 0;
                for (var x = 0; x < uniqueArray.length; x++) {
                    for (var y = 0; y < nngTokens.length; y++) {
                        if (uniqueArray[x] == nngTokens[y]) {
                            count++;
                        }
                    }
                    resultCount.push({
                        key: uniqueArray[x],
                        value: count
                    });
                    count = 0;
                }
                var obj = {
                    "token_Details":resultCount
                }
                console.log(resultCount);


                var update = {  "$set": {"videos.$.tokens": obj }}
                dbo.collection("video_info").findOneAndUpdate(query ,update,function(err,res){
                    if (err) throw err;
                    console.log('token inserted');
                })        
                
                   
                })
                db.close();
            });
    });

