
const url = require('url')
const cheerio = require('cheerio')
const request = require('request-promise-native')
const request2 = require('request')
var hostnameRegex = /^(www.)?youtube.com$/
var globalHeaders = { 'accept-language': 'en-US;q=1.0,en;q=0.9' }



async function channelInfo(channelUrl) {
	return new Promise((resolve, reject) => {
		var parsedUrl = url.parse(channelUrl)
		var channelPathRegex = /^\/(user|channel)\/[_A-Za-z0-9-]{1,}$/g
		var channelUrlType = 'channel'
		if (/^\/user/g.test(parsedUrl.pathname)) {
			channelUrlType = 'user'
		}
		if (hostnameRegex.test(parsedUrl.hostname)) {
			if (channelPathRegex.test(parsedUrl.pathname)) {
				channelId = parsedUrl.pathname.replace(/\/(user|channel)\//g, '')
				var generatedChannelUrl = 'https://www.youtube.com/' + channelUrlType + '/' + channelId + '/about'
				request(generatedChannelUrl, {
					headers: globalHeaders,
				})
					.then(async body => {
						var $ = cheerio.load(body)
						var data = { id: channelId }
						var arr = new Array()
						arr[channelId] = new Array()
						arr[channelId]['title'] = new Array()
						arr[channelId]['link'] = new Array()
						var name = $('.qualified-channel-title-text a').text()
						data.name = name
						$('.about-stat').each((index, element) => {
							var elementText = $(element).text()
							if (/subscribers/g.test(elementText)) {
								var subscribers = elementText.replace(/[^1-9]/g, '')
								data.subscribers = parseInt(subscribers)
							} else if (/views/g.test(elementText)) {
								var views = elementText.replace(/[^1-9]/g, '')
								data.views = parseInt(views)
							} else if (/Joined/g.test(elementText)) {
								var joined = elementText.replace(/Joined /g, '')
								data.joined = new Date(joined)
							}
						})


						let related_channels_title = await $('.yt-uix-tile-link').attr('title',(j,val) =>{
							arr[channelId]['title'].push(val)
						})


						let related_channels_link = await $('.yt-uix-tile-link').attr('href',(j,val) =>{
							arr[channelId]['link'].push('https://www.youtube.com'+val)
						})
					
						var title_obj= arr[channelId]['title']
						var link_obj= arr[channelId]['link']

						data.RelatedChannel = {Related_channel_title: title_obj,Related_channel_link: link_obj}
						data.url = generatedChannelUrl
						var description = $('.about-description pre').text()
						data.description = description
						data.update_timestamp = Math.floor((Date.now() / 1000)/60)
						resolve(data)
					})
					.catch(reject)
			} else reject('Invalid channel URL')
		} else reject('Invalid channel URL')
	})
}

exports.info = channelInfo
