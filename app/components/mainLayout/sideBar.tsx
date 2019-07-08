/**
 * @Name:
 * @Description:
 * @author RiSusss
 * @date 2019-07-02
 */
import React from 'react';
import { ipcRenderer, remote } from 'electron';
import styled from 'styled-components';
import MenuGroup from './menuGroup';
import Tree from '../tree';
import List from '../folderList';
import { useAppContext } from '../../store/appContext';
import { setFolderAction } from '../../store/appStore';
import { getFolderTree, FolderObj } from '../../utils';

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

const initFolders = (folders: string[]) => {
  let folderTrees: FolderObj[] = [];
  folders &&
    folders.forEach(folder => {
      folderTrees.push(...getFolderTree(folder));
    });
  return folderTrees;
};

const initIpcRender = (
  setFolders: (folders: FolderObj[]) => void,
  setMarkFolders: (folders: string[]) => void
) => {
  ipcRenderer.on('action', (event, arg) => {
    switch (arg) {
      case 'open':
        setFolders(initFolders(openFolderDialog()));
        break;
      case 'addMarks':
        const marks = window.localStorage.getItem('marks') || '';
        const folder = openFolderDialog();
        const folders = marks == '' ? folder : [...marks.split(','), ...folder];
        setMarkFolders(folders);
        window.localStorage.setItem('marks', folders.join(','));
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
    window.localStorage.clear()
    initIpcRender(setFolders, setMarkFolders);
    const marks = window.localStorage.getItem('marks') || '';
    const folders = marks.split(',');
    marks.length && setMarkFolders(folders);
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
        <List list={markFolders} />
      </MenuGroup>
    </Wrapper>
  );
};

export default SideBar;
