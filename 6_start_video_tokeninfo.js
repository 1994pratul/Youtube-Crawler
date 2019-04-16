const { execFile ,execSync , execFileSync , spawnSync} = require('child_process')
const child = execFileSync('node', ['./lib/start_video_token.js'])
console.log(child);
