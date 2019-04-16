const { execFile ,execSync , execFileSync , spawnSync} = require('child_process')
const child1= execFileSync('node', ['./lib/start_video_extra_info.js'])
const child2 = execFileSync('node', ['./lib/start_channel_com_compute.js'])
console.log(child1, child2);
