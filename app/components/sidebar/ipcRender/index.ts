import { ipcRenderer, remote } from 'electron';
import { uniq } from 'lodash';
import { FolderObj, getFolderTree, localStore } from '../../../utils';

interface initIpcRenderProps {
  setFileFolders: (folders: FolderObj[]) => void;
  setMarkFolders: (folders: string[]) => void;
  dispatchFolder: (folder: FolderObj) => void;
}

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

const initIpcRender = () => {
  let listener;
  return ({
    setFileFolders,
    setMarkFolders,
    dispatchFolder
  }: initIpcRenderProps) => {
    if (listener) {
      ipcRenderer.removeListener('action', listener);
    }
    listener = (event, arg) => {
      switch (arg) {
        case 'addBucket':
          const of = openFolderDialog();
          if (of) {
            dispatchFolder({
              name: of[0].split('/').pop() || '',
              path: of[0],
              children: []
            });
            setFileFolders(initFolders(of));
            // send message when images opened.
            remote.getCurrentWebContents().send('action', 'imagesOpen');
          }
          break;
        case 'addClass':
          const folders = uniq([
            ...(localStore.getItem('marks') || []),
            ...openFolderDialog()
          ]);
          setMarkFolders(folders);
          localStore.setItem('marks', folders);
          break;
        default:
          // console.log('sidebar no action');
      }
    };
    ipcRenderer.on('action', listener);
  };
};

export default initIpcRender();
