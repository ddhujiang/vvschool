var crypto = require('crypto');
var hash=crypto.createHash('md5');
hash.update("18679197606");
// console.log(hash.digest('hex'));
console.log(hash.digest('hex').substr(7,16));


var UUID = require('uuid-js');
var uuid4 = UUID.create(1);
console.log(UUID.fromURN("18679197606"));
console.log(uuid4.toString());