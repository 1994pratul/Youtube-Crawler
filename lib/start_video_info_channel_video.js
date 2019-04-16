/**
 *                                                                                                # 
 * Copyright (c) 2019 McKinley & Rice, Inc.                                                       # 
 * This product includes software developed at                                                    # 
 * The McKinley & Rice, Inc. (https://www.mckinleyrice.com/).                                     # 
 * This material is proprietary to The McKinley & Rice.                                           # 
 * All rights reserved. The methods and techniques described                                      # 
 * herein are considered trade secrets and/or confidential.                                       # 
 * Reproduction or distribution, in whole or in part, is forbidden                                # 
 * except by express written permission of The McKinley & Rice.                                   # 
 *                                                                                                # 
 * File: c:\Users\HEMBAD\Desktop\yt-channel-all-videos (1)\start_comments_channel_video.js        # 
 * Created Date: Tuesday, March 26th 2019, 5:40:30 pm                                             # 
 * Author: Hemprasad Badgujar                                                                     # 
 * -----                                                                                          # 
 * Last Modified: Thursday March 28th 2019 2:31:59 pm                                             # 
 * Modified By: Hemprasad Badgujar at <admin@mckinleyrice.com>                                    # 
 * -----                                                                                          # 
 * HISTORY:                                                                                       # 
 * Date      	By	Comments                                                                      # 
 * ----------	---	----------------------------------------------------------                    # 
 */



const { execFile ,execSync , execFileSync , spawnSync} = require('child_process')
if (process.argv.length <= 2) {
	console.log("Usage: " + __filename + " SOME_PARAM");
	process.exit(-1);
}
 
var Channel_ID = process.argv[2];
 

var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/mydb'
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
	if (err) throw err
	var dbo = db.db('input')

	dbo.collection("channel_info").findOne({'id': Channel_ID } , function(err, result) 
	{ 
	//	var firstvid = result.length;

		
	   var counter =  result.videoList.length
		for (var i = 0; i < counter; i++) {
			console.log( "Started : ---->",result.videoList[i].id)
	     // console.log("-->",result.id)
			const child1 = execFileSync('node', ['./lib/video/fetch_video_info_db.js', result.videoList[i].id, result.id])
		
		}
		db.close();
	})
})
