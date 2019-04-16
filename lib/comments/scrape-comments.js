const Validation = require('data.validation')
const Task = require('data.task')
const chalk = require('chalk')
const fs = require('fs')

const parseOptions = require('./parse/parse-options')
const scrapeAllComments = require('./scrape-all-comments')
const streamComments = require('./utility/stream-comments')
const createFile = require('./utility/create-file')

const validationToTask = val => val.fold(Task.rejected, Task.of)

const validateVideoId = videoId =>
	Validation.fromNullable(videoId).failureMap(() => [
		'Missing required parameter: videoId',
	])

const validateArgs = (videoId, opts) =>
	Validation.Success(videoId => opts => ({ videoId, opts }))
		.ap(validateVideoId(videoId))
		.ap(parseOptions(opts))
const printError = err => {
	console.error(chalk.red('✕'), err.message || err)
	return err
}

module.exports = (videoId, opts) =>
	validationToTask(validateArgs(videoId, opts))
		.chain(opts.stream ? streamComments : scrapeAllComments)
		.fork(e => (Array.isArray(e) ? e.map(printError) : printError(e)), () => {})
