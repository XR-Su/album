/**
 * @Name: 获取目录树
 * @Description:
 * @author RiSusss
 * @date 2019-07-02
 */
const fs = require('fs');
const path = require('path');

interface FolderObj {
  name: string;
  path: string;
  children: FolderObj[];
}

const getFolders = (folders: FolderObj[]) => {
  folders.forEach(folder => {
    fs.readdirSync(folder.path).forEach(file => {
      const filePath = folder.path + '/' + file;
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        const newFolder: FolderObj = {
          name: file,
          path: filePath,
          children: []
        };
        folder.children.push(newFolder);
      }
    });
  });
  folders.forEach(folder => {
    getFolders(folder.children);
  });
};

const getFolderTree = folderPath => {
  const root: FolderObj = {
    name: path.basename(folderPath),
    path: folderPath,
    children: []
  };
  const folders: FolderObj[] = [root];

  getFolders(folders);

  return root;
};

export default getFolderTree;
