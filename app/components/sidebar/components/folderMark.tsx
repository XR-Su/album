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
import colors from '../../../constants/colors';

interface FolderMarkProps {
  folder: string;
  setMarkFolders: (val: string[]) => void;
}

// ${props =>
//   props.isDragEnter
//     ? 'box-shadow: 2px 10px 20px rgb(30,30,30);z-index: 1;'
//     : ''}
const Wrapper = styled(animated.div)`
  position: relative;
  height: 51px;
  text-align: right;
  padding-bottom: 5px;
  border-bottom: 1px solid;
  border-color: var(--gray-161);
  overflow: hidden;
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

const DeleteIcon = styled.div`
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
  }
});

const FolderMark = ({ folder, setMarkFolders }: FolderMarkProps) => {
  const { state: app, dispatch } = useAppContext();
  const [transX, setTransX] = React.useState(0);
  const [isDragEnter, setDragEnter] = React.useState(false);

  const { setSelImgs } = initDispatch(dispatch);
  const isFolderExisted = checkFileExist(folder);
  const name = folder.split('/').pop();

  /** animations **/
  const bind = useGesture({
    onWheel: ({ delta }) => {
      setTransX(clamp(-delta[0], -40, 0));
    }
  });
  const translate = () => {
    if (isDragEnter) {
      return 24;
    } else {
      return transX < -20 ? -40 : 0;
    }
  };
  const { x } = useSpring({
    x: translate()
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

  /** attributes **/
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
  const markStyle = () => {
    const style = {
      transform: interpolate([x], x => `translate3d(${x}px,0,0)`)
    };
    return isFolderExisted
      ? {
          style: {
            ...style,
            color: x.interpolate({
              range: [0, 24],
              output: [colors.FONT_COLOR, colors.POSITIVE_COLOR]
            })
          }
        }
      : {
          style
        };
  };
  const wrapperStyle = () => {
    const style = {
      color: colors.NEGATIVE_COLOR,
      borderColor: colors.NEGATIVE_COLOR_SUB
    };
    return isFolderExisted
      ? {
          style: {
            ...style,
            borderColor: x.interpolate({
              // @ts-ignore
              range: [0, 24],
              output: [colors.BORDER_COLOR, colors.POSITIVE_COLOR],
              extrapolate: 'clamp'
            })
          }
        }
      : {
          style
        };
  };
  return (
    <Wrapper {...wrapperStyle()}>
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
      <DeleteIcon onClick={handleDelete}>
        <Icon className="iconfont icondelete" />
      </DeleteIcon>
    </Wrapper>
  );
};

export default FolderMark;
