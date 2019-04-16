const cheerio = require('cheerio')
const request = require('request')
var mongoUtil = require( '../../config/key' )
var db = mongoUtil.getDb()
var related_channel= require('./related_channel.js')
var result_get
var final_results
var final_result

var id = 'https://www.youtube.com/channel/'

exports.total_video_channel=function()
{
	async function Database(){
		db.collection('channel_list').findOne({},async function(err, result) {
			if (err) throw err
			result_get = result
			final_result= result_get.obj
			final_results = await final_result.map(a => id + a.id + '/videos')
			call(final_results)
		})
	}
	var arr = new Array()
	async function call(data_flow){
		for (var k=0; k<=2;k++)
		{
			const body = await getBody(data_flow[k])
			let $ =  await cheerio.load(body)
			var chId = data_flow[k].toString().split('/')
			chId = chId[4]
			arr[chId] = new Array()
			arr[chId]['title'] = new Array()
			arr[chId]['link'] = new Array()

			let video_list = await $('.yt-lockup-title').text()
			let Video_link = await $('.yt-ui-ellipsis-2').attr('href',(j,value)=>{
				arr[chId]['link'].push(value) 
			})
			let Video_Title = await $('.yt-ui-ellipsis-2').attr('title',(j,value)=>{
				arr[chId]['title'].push(value) 
			})
			var title_obj= arr[chId]['title']
			var link_obj= JSON.stringify(arr[chId]['link'])
			var myquery = {Total_videos: {Video_title: '',Video_link: ''}}
			var values = {$set: {Total_videos: {Video_title: title_obj,Video_link: link_obj}}}
			db.collection('channel_info').update(myquery,values, function(err, res) {
				if (err) throw err
			})
		}
		related_channel.related_channel()
	}Database()
	function getBody(url) {
		return new Promise((resolve, reject) => {
			request( url, function(err, res, body) {
				if (err) {
					return reject(err)
				}
				resolve(body)
			})
		})
	}
}
