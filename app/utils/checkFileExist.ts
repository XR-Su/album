const fs = require('fs');

const checkFileExist = (path: string) => fs.existsSync(path);

export default checkFileExist;
