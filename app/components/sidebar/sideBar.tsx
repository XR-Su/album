/**
 * @Name:
 * @Description:
 * @author RiSusss
 * @date 2019-07-02
 */
import React from 'react';
import { ipcRenderer, remote } from 'electron';
import styled from 'styled-components';
import MenuGroup from './components/menuGroup';
import Tree from '../tree';
import List from './components/folderList';
import { useAppContext } from '../../store/appContext';
import { setFolderAction } from '../../store/appStore';
import { getFolderTree, FolderObj, localStore } from '../../utils';

const Wrapper = styled.div<{ open: boolean }>`
  position: absolute;
  width: 220px;
  height: 100vh;
  padding: 10px;
  border-right: 1px solid rgb(68, 68, 68);
  background-color: rgb(50, 50, 50);
  ${props => !props.open && 'transform: translate(-220px); '}
  transition: transform 0.3s ease;
`;

interface SideBarProps {
  open: boolean;
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

const initIpcRender = (
  setFolders: (folders: FolderObj[]) => void,
  setMarkFolders: (folders: string[]) => void,
  dispatch
) => {
  ipcRenderer.on('action', (event, arg) => {
    switch (arg) {
      case 'open':
        // setFolders(initFolders(openFolderDialog()));
        const of = openFolderDialog();
        setFolderAction(dispatch, { name: '', path: of[0], children: [] });
        setFolders(initFolders(of));
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

const SideBar = ({ open }: SideBarProps) => {
  const [folders, setFolders] = React.useState<FolderObj[]>([]);
  const [markFolders, setMarkFolders] = React.useState<string[]>([]);
  const { dispatch } = useAppContext();

  React.useEffect(() => {
    initIpcRender(setFolders, setMarkFolders, dispatch);
    const marks = localStore.getItem('marks') || '';
    marks && setMarkFolders(marks);
  }, ['DidMount']);

  const onChange = folder => {
    setFolderAction(dispatch, folder);
  };
  return (
    <Wrapper {...{ open }}>
      <MenuGroup name="Folder">
        <Tree tree={folders} onChange={onChange} />
      </MenuGroup>
      <MenuGroup name="Marks">
        <List setMarkFolders={setMarkFolders} list={markFolders} />
      </MenuGroup>
    </Wrapper>
  );
};

export default SideBar;
