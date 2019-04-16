const cheerio = require('cheerio')
const request = require('request')
var result_get
var final_results
var mongoUtil = require( '../../config/key' )
var db = mongoUtil.getDb()
var id = 'https://www.youtube.com/channel/'
var videoinfo= require('../test.js')

exports.related_channel=function()
{
	async function Database(){
		db.collection('channel_list').findOne({}, async function(err, result) {
			if (err) throw err
			result_get = result
			var final_result= await result_get.obj
			final_results = await final_result.map(a => id + a.id + '/about')
			call(final_results)
		})
	}

	var arr = new Array()
	async function call(data_flow){
		for (var l=0; l<=2;l++)
		{
			var chId = data_flow[l].toString().split('/')
			chId = chId[4]
			arr[chId] = new Array()
			arr[chId]['title'] = new Array()
			arr[chId]['link'] = new Array()
			const body = await getBody(data_flow[l])
			let $ =  cheerio.load(body)
			let related_channels_title = await $('.yt-uix-tile-link').attr('title',(j,val) =>{
				arr[chId]['title'].push(val)
			})
			let related_channels_link = await $('.yt-uix-tile-link').attr('href',(j,val) =>{
				arr[chId]['link'].push(val)
			})
			var title_obj= arr[chId]['title']
			var link_obj= JSON.stringify(arr[chId]['link'])
			var myquery = {Related_Channels: {Related_channel_title: '',Related_channel_link: ''}}
			var values = {$set: {Related_Channels: {Related_channel_title: title_obj,Related_channel_link: link_obj}}}
			db.collection('channel_info').update(myquery,values, function(err, res) {
				if (err) throw err
			})
		}
		videoinfo.videoinfo() 
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
