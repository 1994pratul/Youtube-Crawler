const { execFile ,execSync , execFileSync , spawnSync} = require('child_process')
const child = execFileSync('node', ['./lib/start_comments_channel.js'])
console.log(child);