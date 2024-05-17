const os = require("os");

console.log(os.version());
console.log(os.arch());
const freeMemory = os.freemem();
console.log(`${freeMemory / 1024 / 1024 / 1024}`);
console.log(os.platform());
console.log(os.type());
