/**
 * @Name:
 * @Description:
 * @author RiSusss
 * @date 2019-07-02
 */
import React from 'react';
import { remote } from 'electron';
import styled from 'styled-components';
import MenuGroup from './components/menuGroup';
import Tree from '../tree';
import List from './components/folderList';
import { useAppContext } from '../../store/appContext';
import { setSelectedFolderAction } from '../../store/actions';
import { FolderObj, localStore } from '../../utils';
import initIpcRender from './ipcRender';

const Wrapper = styled.div<{ open: boolean }>`
  display: flex;
  flex-direction: column;
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

const initDispatch = dispatch => ({
  dispatchFolder: folder => dispatch(setSelectedFolderAction(folder))
});

const SideBar = ({ open }: SideBarProps) => {
  const [fileFolders, setFileFolders] = React.useState<FolderObj[]>([]);
  const [markFolders, setMarkFolders] = React.useState<string[]>([]);
  const { dispatchFolder } = initDispatch(useAppContext().dispatch);

  React.useEffect(() => {
    initIpcRender({ setFileFolders, setMarkFolders, dispatchFolder });
    const marks = localStore.getItem('marks') || '';
    marks && setMarkFolders(marks);
  }, ['DidMount']);

  const onChange = folder => {
    dispatchFolder(folder);
  };
  const handleAddBucket = () => {
    remote.getCurrentWebContents().send('action', 'addBucket');
  };
  const handleAddClass = () => {
    remote.getCurrentWebContents().send('action', 'addClass');
  };
  return (
    <Wrapper {...{ open }}>
      <MenuGroup name="Buckets" addFn={handleAddBucket}>
        <Tree tree={fileFolders} onChange={onChange} />
      </MenuGroup>
      <MenuGroup name="Classes" addFn={handleAddClass}>
        <List setMarkFolders={setMarkFolders} list={markFolders} />
      </MenuGroup>
    </Wrapper>
  );
};

export default SideBar;
