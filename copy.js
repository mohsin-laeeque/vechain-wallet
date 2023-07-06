var fs = require('fs-extra');

fs.copy('dist/bex/UnPackaged/www', 'v3/www', function (err) {
  if (err) {
console.error(err);
  } else {
    console.log("success!");
  }
});
