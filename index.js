const { execFileSync} = require('child_process')
const child0 = execFileSync('node', ['./1_start_channel.js'])
const child1 = execFileSync('node', ['./2_start_comment.js'])
const child2 = execFileSync('node', ['./3_start_video_info.js'])
const child3 = execFileSync('node', ['./4_start_video_extrainfo.js'])
const child4 = execFileSync('node', ['./5_start_channel_extrainfo.js'])

console.log( child0 , child1 ,child2, child3, child4);
