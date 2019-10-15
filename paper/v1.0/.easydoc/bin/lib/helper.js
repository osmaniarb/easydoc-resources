var fs = require('fs');
var child_process = require('child_process');


var deleteFolderContentRecursive = function(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function(file, index){
      var curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
  }
};

var escapeShell = function(cmd) {
  return '"'+cmd.replace(/(["\s'$`\\])/g,'\\$1')+'"';
};

var exec = function(cmd) {
  child_process.exec(cmd, (err, stdout, stderr) => {
    if (err) {
      throw(err);
    }
  
    if (stdout) console.log(stdout);
    if (stderr) console.log(stderr);
  });
}

if(typeof module != 'undefined') {
  module.exports = {
    escapeShell,
    exec,
    deleteFolderContentRecursive
  }
}
