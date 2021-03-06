const Either = require('data.either')

const parseCommentRenderer = require('./parse-comment-renderer')
const traverse = require('../utility/traverse-array')

const { cheerioFindAll } = require('../utility/cheerio-utils')

const parseReplies = $replies =>
	cheerioFindAll($replies, '.comment-renderer').chain($commentRenderers =>
		traverse($commentRenderers, Either.of, parseCommentRenderer)
	)

module.exports = parseReplies
