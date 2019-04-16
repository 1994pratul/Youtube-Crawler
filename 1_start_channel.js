
var channel = require('./lib/channel/channel_basic_info')
const { execFile ,execSync , execFileSync , spawnSync} = require('child_process')
const checkdb = execFileSync('node', ['./lib/check/check_channel_db.js'])
console.log(Buffer.isBuffer(checkdb))
channel.channelBasicInfo()
