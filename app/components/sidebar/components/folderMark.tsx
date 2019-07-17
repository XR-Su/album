/**
 * @Name:
 * @Description:
 * @author RiSusss
 * @date 2019-07-02
 */
import React from 'react';
import styled from 'styled-components';
import { animated } from 'react-spring';
import { useAppContext } from '../../../store/appContext';
import {
  setSelectedImagesAction,
  setSelectedFolderAction
} from '../../../store/actions';
import { moveFile, localStore, checkFileExist } from '../../../utils';
import { useMarkAnimation } from './animation';

interface FolderMarkProps {
  folder: string;
  setMarkFolders: (val: string[]) => void;
}

interface Dispatches {
  setSelImgs: (images: string[]) => void;
}

const Wrapper = styled(animated.div)`
  position: relative;
  height: 51px;
  text-align: right;
  padding-bottom: 5px;
  border-bottom: 1px solid;
  border-color: var(--gray-161);
  overflow: hidden;
  cursor: pointer;
`;

const MarkWrapper = styled(animated.div)`
  position: absolute;
  height: 50px;
  padding-bottom: 10px;
  left: 0;
  right: 0;
  top: 0;
  display: flex;
  align-items: flex-end;
  user-select: none;
  background-color: var(--gray-deep-50);
  padding-left: 4px;
`;

const Icon = styled('i')`
  font-size: 24px;
`;

const DeleteButton = styled.div`
  display: inline-block;
  height: 50px;
  line-height: 50px;
  width: 40px;
  text-align: center;
  background-color: var(--red);
  color: var(--font-color);
`;

const Label = styled('p')`
  font-size: 20px;
  vertical-align: middle;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  pointer-events: none;
`;

const initDispatch = dispatch => ({
  setSelImgs: images => {
    dispatch(setSelectedImagesAction(images));
  },
  setSelFolder: folder => {
    dispatch(
      setSelectedFolderAction({
        name: folder.split('/').pop(),
        path: folder,
        children: []
      })
    );
  }
});

const FolderMark = React.memo(({ folder, setMarkFolders }: FolderMarkProps) => {
  const { state: app, dispatch } = useAppContext();
  const [isImgEnter, setImgEnter] = React.useState(false);

  const { setSelImgs, setSelFolder } = initDispatch(dispatch);
  const isFolderExisted: boolean = checkFileExist(folder);
  const name: string = folder.split('/').pop() || '';

  /** animations **/
  const { bind, markStyle, wrapperStyle } = useMarkAnimation({
    isImgEnter,
    isFolderExisted
  });

  /** events **/
  const onDrop = () => {
    if (app.isDragging) {
      if (app.selectedImages.length > 0) {
        app.selectedImages.forEach(image => {
          moveFile(image, folder + '/' + image.split('/').pop());
        });
        // reset selected images array
        setSelImgs([]);
      } else {
        moveFile(
          app.draggedImage,
          folder + '/' + app.draggedImage.split('/').pop()
        );
      }
    }
    setImgEnter(false);
  };
  const onDragEnter = () => {
    setImgEnter(true);
  };
  const onDragLeave = () => {
    setImgEnter(false);
  };
  const handleDelete = () => {
    localStore.remove('marks', folder);
    setMarkFolders(localStore.getItem('marks'));
  };
  const handleClick = () => {
    if (isFolderExisted) {
      setSelFolder(folder);
    }
  };
  /** attributes **/
  const drop = () => {
    return isFolderExisted
      ? {
          onDrop,
          onDragEnter,
          onDragLeave,
          onDragOver: e => e.preventDefault()
        }
      : {};
  };
  return (
    <Wrapper {...wrapperStyle()} onClick={handleClick}>
      <MarkWrapper
        className="folder-mark"
        {...bind()}
        {...drop()}
        {...markStyle()}
      >
        <Icon
          className="iconfont iconalbum"
          style={{ marginRight: '6px', pointerEvents: 'none' }}
        />
        <Label>{name}</Label>
      </MarkWrapper>
      <DeleteButton onClick={handleDelete}>
        <Icon className="iconfont icondelete" />
      </DeleteButton>
    </Wrapper>
  );
});

export default FolderMark;
