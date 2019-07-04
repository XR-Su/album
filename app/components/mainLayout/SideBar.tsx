/**
 * @Name:
 * @Description:
 * @author RiSusss
 * @date 2019-07-02
 */
import React from 'react';
import { ipcRenderer, remote } from 'electron';
import styled from 'styled-components';
import MenuGroup from './MenuGroup';
import Tree from '../tree';
import { useAppContext } from '../../store/appContext';
import { setFolderAction } from '../../store/appStore';
import { getFolderTree, FolderObj } from '../../utils';

const Wrapper = styled('div')<{ open: boolean }>`
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
  setMarkFolders: (folders: FolderObj[]) => void
) => {
  ipcRenderer.on('action', (event, arg) => {
    switch (arg) {
      case 'open':
        setFolders(initFolders(openFolderDialog()));
        break;
      case 'addMarks':
        setMarkFolders(initFolders(openFolderDialog()));
        break;
      default:
        console.log('no action');
    }
  });
};

const SideBar = ({ open }: SideBarProps) => {
  const [folders, setFolders] = React.useState<FolderObj[]>([]);
  const [markFolders, setMarkFolders] = React.useState<FolderObj[]>([]);
  const { dispatch } = useAppContext();

  React.useEffect(() => {
    initIpcRender(setFolders, setMarkFolders);
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
        <Tree tree={markFolders} />
      </MenuGroup>
    </Wrapper>
  );
};

export default SideBar;
