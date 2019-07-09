import { ipcRenderer, remote } from 'electron';
import { FolderObj, getFolderTree, localStore } from '../../../utils';

const openFolderDialog = () => {
  return (
    remote.dialog.showOpenDialog(remote.getCurrentWindow(), {
      properties: ['openDirectory', 'multiSelections']
    }) || []
  );
};

const initFolders = (folders: string[] = []) => {
  let folderTrees: FolderObj[] = [];
  folders.forEach(folder => {
    folderTrees.push(...getFolderTree(folder));
  });
  return folderTrees;
};

const initIpcRender = (
  setFileFolders: (folders: FolderObj[]) => void,
  setMarkFolders: (folders: string[]) => void,
  dispatchFolder: (folder: FolderObj) => void
) => {
  ipcRenderer.on('action', (event, arg) => {
    switch (arg) {
      case 'open':
        const of = openFolderDialog();
        dispatchFolder({
          name: of[0].split('/').pop() || '',
          path: of[0],
          children: []
        });
        setFileFolders(initFolders(of));
        break;
      case 'addMarks':
        const folders = [
          ...(localStore.getItem('marks') || []),
          ...openFolderDialog()
        ];
        setMarkFolders(folders);
        localStore.setItem('marks', folders);
        break;
      default:
        console.log('no action');
    }
  });
};

export default initIpcRender;
