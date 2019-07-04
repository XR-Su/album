/**
 * @Name:
 * @Description: get filePath from the folder
 * @author RiSusss
 * @date 2019-05-26
 */
const fs = require('fs');

const getFolderFiles = folderPath => {
  const mds: string[] = [];
  const images: string[] = [];
  const folders: string[] = [];
  const files: string[] = [];
  const webps: string[] = [];
  if (!fs.existsSync(folderPath)) {
    console.log('path not exist !');
  } else {
    fs.readdirSync(folderPath).forEach(file => {
      const filePath = folderPath + '/' + file;
      const stat = fs.statSync(filePath);
      if (stat.isFile()) {
        if (/(.*)\.(md)/.test(file.toLowerCase())) {
          mds.push(filePath);
        } else if (/(.*)\.(jpg|jpeg|png)/.test(file.toLowerCase())) {
          images.push(filePath);
        } else if (/(.*)\.(webp)/.test(file.toLowerCase())) {
          webps.push(filePath);
        }
        files.push(filePath);
      } else if (stat.isDirectory()) {
        folders.push(filePath);
      }
    });
  }
  return { mds, images, files, folders, webps };
};

export default getFolderFiles;
