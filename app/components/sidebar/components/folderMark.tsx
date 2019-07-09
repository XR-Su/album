/**
 * @Name:
 * @Description:
 * @author RiSusss
 * @date 2019-07-02
 */
import React from 'react';
import styled from 'styled-components';
import { useGesture } from 'react-use-gesture';
import _ from 'lodash';
import { useSpring, animated, interpolate } from 'react-spring';
import { useAppContext } from '../../../store/appContext';
import { moveFile, localStore } from '../../../utils';

interface FolderMarkProps {
  folder: string;
  setMarkFolders: (val: string[]) => void;
}

const Wrapper = styled.div`
  position: relative;
  height: 51px;
  text-align: right;
  padding-bottom: 5px;
  border-bottom: 1px solid var(--gray-161);
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

const FolderMark = ({ folder, setMarkFolders }: FolderMarkProps) => {
  const { state: app } = useAppContext();
  const [transX, setTransX] = React.useState(0);
  const [down, setDown] = React.useState(true);
  const name = folder.split('/').pop();
  const bind = useGesture({
    onDrag: ({ delta, down }) => {
      setTransX(_.clamp(delta[0], -40, 0));
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
      moveFile(
        app.selectedImage,
        folder + '/' + app.selectedImage.split('/').pop()
      );
    }
  };
  const handleDelete = () => {
    localStore.remove('marks', folder);
    setMarkFolders(localStore.getItem('marks'));
  };
  return (
    <Wrapper>
      <MarkWrapper
        className="folder-mark"
        onDrop={onDrop}
        onDragOver={e => e.preventDefault()}
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
