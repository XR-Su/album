const fs = require('fs');

const moveFile = (src: string, tar: string) => {
  fs.rename(src, tar, function(err) {
    if (err) throw err;
  });
};

export default moveFile;
