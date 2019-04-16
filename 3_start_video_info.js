const { execFile ,execSync , execFileSync , spawnSync} = require('child_process')
const child = execFileSync('node', ['./lib/start_video_info_channel.js'])
console.log(child);
