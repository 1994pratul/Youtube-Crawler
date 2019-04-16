const { execFile ,execSync , execFileSync , spawnSync} = require('child_process')
const child1 = execFileSync('node', ['./lib/start_channel_extra_info.js'])
const child2 = execFileSync('node', ['./lib/start_channel_country_count.js'])
const child3 = execFileSync('node', ['./lib/start_related_channel_comm.js'])
const child4 = execFileSync('node', ['./lib/start_subscribed_channel_comm.js'])
console.log(child1, child2, child3, child4);
