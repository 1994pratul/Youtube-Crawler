require('events').EventEmitter.defaultMaxListeners = 0
// const program = require('commander')
const R = require('ramda')
const pkg = require('../package.json')
const scrapeComments = require('./comments/scrape-comments')
// program
// 	.arguments('<VideoID>','<Channel_Id>')
// 	.option(
// 		'-f --format <format>',
// 		// 'output format (json or csv)',
// 		/^(json|csv)$/i
// 	)
    
// 	.parse(process.argv)


if (process.argv.length <= 3) {
	console.log("Usage: " + __filename + " SOME_PARAM");
	process.exit(-1);
}
 
const channel_Id= process.argv[3];
const videoId = process.argv[2];
global.Video_ID = videoId 
global.Channel_ID = channel_Id

// if (!videoId) {
// 	console.error('Please provide a VideoID.')
// 	program.outputHelp()
// 	process.exit(1)
// }
  
const opts = R.pick(
	['format', 'outputFile', 'stdout', 'collapseReplies', 'stream'],
	//program
)
scrapeComments(videoId, opts)
  
