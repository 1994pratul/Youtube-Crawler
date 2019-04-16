const Either = require('data.either')
const Task = require('data.task')
const { omit } = require('ramda')
const fetchFirstPageToken = require('./fetch-first-page-token')
const fetchCommentPage = require('./fetch-comment-page')
const parseCommentThread = require('../parse/parse-comment-thread')
const fetchReplies = require('./fetch-replies')
const traverse = require('../utility/traverse-array')
const { cheerio } = require('../utility/cheerio-utils')

const tokenizeComments = html =>
	Either.fromNullable(cheerio.load(html))
		.map($ => $('.comment-thread-renderer').toArray())
		.map(cs => cs.map(cheerio))

const parseComments = $commentThread =>
	parseCommentThread($commentThread).fold(Task.rejected, Task.of)

const fetchCommentReplies = (videoId, comment) =>
	fetchReplies(videoId, comment)
		.map(rs => (rs && rs.length ? Either.of(rs) : Either.Left()))
		.map(re =>
			re
				.map(replies =>
					Object.assign({}, comment, {
						hasReplies: true,
						numReplies: replies.length,
						replies,
					})
				)
				.leftMap(_ =>
					Object.assign({}, omit(['repliesToken'], comment), {
						hasReplies: false,
					})
				)
				.merge()
		)

const addReplies = (videoId, comment) =>
	(comment.hasReplies && !comment.replies
		? fetchCommentReplies(videoId, comment).fold(() => comment, x => x)
		: Task.of(comment))

const fetchComments = (videoId, pageToken) =>
	Either.fromNullable(pageToken)
		.leftMap(_ => fetchFirstPageToken(videoId))
		.map(t => Task.of(t))
		.merge()
		.chain(t => fetchCommentPage(videoId, t))
		.chain(({ commentHtml, nextPageToken }) =>
			tokenizeComments(commentHtml)
				.chain(cs => traverse(cs, Task.of, parseComments))
				.chain(cs => traverse(cs, Task.of, c => addReplies(videoId, c)))
				.map(comments =>
					Object.assign(
						{},
						{ comments },
						nextPageToken ? { nextPageToken } : {}
					)
				)
		)

module.exports = fetchComments

