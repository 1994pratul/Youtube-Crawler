

var final_json = require('./sumit.json')
var fs = require('fs')
const math = require('./math.js')

var data = final_json
var final_arr = []
var myArr = []


var uniqueNames = []
for (i = 0; i < data.length; i++) {
	if (uniqueNames.indexOf(data[i].videoinfo.channelId) == -1) {
		uniqueNames.push(data[i].videoinfo.channelId)
	}
}

for (var y = 0; y < uniqueNames.length; y++) {
	for (var x = 0; x < data.length; x++) {

		if (uniqueNames[y] == data[x].videoinfo.channelId) {
			var channelData = data[x].videoinfo.data
			if (channelData.length > 0) {
				for (var q = 0; q < channelData.length; q++) {
					myArr.push(channelData[q])
				}
			}
		}
	}

	final_arr.push({
		key: uniqueNames[y],
		value: myArr,
	})
	myArr = []
}

var final_sorted_array = [] = final_arr[0].value

var uniqueCodes = []
var uiqueCodeCounts = []

function getUnique() {
	for (i = 0; i < final_sorted_array.length; i++) {
		if (uniqueCodes.indexOf(final_sorted_array[i].authorLink) == -1) {
			uniqueCodes.push(final_sorted_array[i].authorLink)
		}
	}
	getCounts()
}

function getCounts() {
	uniqueCodes.forEach(function (i, val) {
		var ThisCt = 0 
		final_sorted_array.forEach(function (i2, val2) {
			if (i == i2.authorLink) {
				ThisCt++
			}
		})
		uiqueCodeCounts.push(ThisCt)
	})
}
getUnique()

var obj = {
	'url': uniqueCodes,
	'urlCount': uiqueCodeCounts,
}
var ints = obj.urlCount 

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

console.log('Total  : ', total)

console.log('Based on Q : \n', loyaltyList)
