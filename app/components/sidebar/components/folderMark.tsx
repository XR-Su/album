/**
 * @Name:
 * @Description:
 * @author RiSusss
 * @date 2019-07-02
 */
import React from 'react';
import styled from 'styled-components';
import { useGesture } from 'react-use-gesture';
import { clamp } from 'lodash';
import { useSpring, animated, interpolate } from 'react-spring';
import { useAppContext } from '../../../store/appContext';
import { setSelectedImagesAction } from '../../../store/actions';
import { moveFile, localStore, checkFileExist } from '../../../utils';

interface FolderMarkProps {
  folder: string;
  setMarkFolders: (val: string[]) => void;
}
const Wrapper = styled.div<{ exist: boolean; isDragEnter: boolean }>`
  position: relative;
  height: 51px;
  text-align: right;
  padding-bottom: 5px;
  border-bottom: 1px solid var(--gray-161);
  border-radius: 4px;
  ${props => (props.exist ? '' : 'color: rgb(204, 87, 87)')}
  ${props =>
    props.isDragEnter
      ? 'box-shadow: 2px 10px 20px rgb(30,30,30);z-index: 1;'
      : ''}
`;

const MarkWrapper = styled(animated.div)`
  position: absolute;
  line-height: 50px;
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

const DeleteIcon = styled.div`
  display: inline-block;
  height: 50px;
  line-height: 50px;
  width: 40px;
  text-align: center;
  background-color: red;
`;

const Label = styled('span')`
  font-size: 20px;
  vertical-align: middle;
`;

const initDispatch = dispatch => ({
  setSelImgs: (images: string[]) => {
    dispatch(setSelectedImagesAction(images));
  }
});

const FolderMark = ({ folder, setMarkFolders }: FolderMarkProps) => {
  const { state: app, dispatch } = useAppContext();
  const [transX, setTransX] = React.useState(0);
  const [down, setDown] = React.useState(true);
  const [isDragEnter, setDragEnter] = React.useState(false);
  const name = folder.split('/').pop();
  const { setSelImgs } = initDispatch(dispatch);
  const isFolderExisted = checkFileExist(folder);
  const bind = useGesture({
    onDrag: ({ delta, down }) => {
      setTransX(clamp(delta[0], -40, 0));
      setDown(down);
    }
  });
  const translate = () => {
    if (down) {
      return transX;
    } else {
      return transX < -20 ? -40 : 0;
    }
  };
  const { x } = useSpring({
    x: translate()
  });
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
  };
  const onDragEnter = () => {
    setDragEnter(true);
  };
  const onDragLeave = () => {
    setDragEnter(false);
  };
  const handleDelete = () => {
    localStore.remove('marks', folder);
    setMarkFolders(localStore.getItem('marks'));
  };

  const drop = () => {
    return isFolderExisted
      ? {
          onDrop: onDrop,
          onDragOver: e => e.preventDefault(),
          onDragEnter: onDragEnter,
          onDragLeave: onDragLeave
        }
      : {};
  };
  return (
    <Wrapper exist={isFolderExisted} isDragEnter={isDragEnter}>
      <MarkWrapper
        className="folder-mark"
        {...drop()}
        {...bind()}
        style={{
          transform: interpolate([x], x => `translate3d(${x}px,0,0)`)
        }}
      >
        <Icon className="iconfont iconalbum" style={{ marginRight: '6px' }} />
        <Label>{name && name.length > 12 ? name.slice(0, 12) : name}</Label>
      </MarkWrapper>
      <DeleteIcon onClick={handleDelete}>
        <Icon className="iconfont icondelete" />
      </DeleteIcon>
    </Wrapper>
  );
};

export default FolderMark;
