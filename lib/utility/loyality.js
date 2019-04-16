const math = require('./#math.js/index.js')
var ints = [1,
	1,
	1,
	2,
	1,
	1,
	1,
	1,
	2,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	6,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1]
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
console.log(total)
console.log(loyaltyList);
