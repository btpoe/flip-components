const fs = require('fs');
const { promisify } = require('util');
const glob = promisify(require('glob'));

glob('src/*.js', null)
  .then(files => (
    files.map(file => file.replace('src/', '')).forEach(fs.unlinkSync)
  ))
  .catch(err => {
    console.error(err);
  });
