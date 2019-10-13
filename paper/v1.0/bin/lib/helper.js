var child_process = require('child_process');

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
    escapeShell: escapeShell,
    exec: exec,
  }
}
