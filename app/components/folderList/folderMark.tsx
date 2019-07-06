/**
 * @Name:
 * @Description:
 * @author RiSusss
 * @date 2019-07-02
 */
import React from 'react';
import styled from 'styled-components';
import Hammer from 'hammerjs';
import { useAppContext } from '../../store/appContext';
import { moveFile } from '../../utils';

interface FolderMarkProps {
  folder: string;
}

const Wrapper = styled.div`
  position: relative;
  height: 51px;
  text-align: right;
  padding-bottom: 5px;
  border-bottom: 1px solid var(--gray-161);
`;

const MarkWrapper = styled('div')`
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

const FolderMark = ({ folder }: FolderMarkProps) => {
  const { state: app } = useAppContext();
  const name = folder.split('/').pop();
  const onDrop = () => {
    console.log('mark', app.isDragging);
    console.log('selectedImage', app.selectedImage);
    if (app.isDragging) {
      moveFile(
        app.selectedImage,
        folder + '/' + app.selectedImage.split('/').pop()
      );
    }
  };
  const bindAnimation = el => {
    if (el == null) return;
    console.log(el);
    const manager = new Hammer.Manager(el);
    const Pan = new Hammer.Pan({ threshold: 1 });
    manager.add(Pan);
    manager.on('pan', e => {
      console.log(el);
      el.style.cssText += `;transform: translate(${e.deltaX}px,0);`;
    });
  };
  return (
    <Wrapper>
      <MarkWrapper
        ref={bindAnimation}
        className="folder-mark"
        onDrop={onDrop}
        onDragOver={e => e.preventDefault()}
      >
        <Icon className="iconfont iconalbum" style={{ marginRight: '6px' }} />
        <Label>{name}</Label>
      </MarkWrapper>
      <DeleteIcon>
        <Icon className="iconfont icondelete" />
      </DeleteIcon>
    </Wrapper>
  );
};

export default FolderMark;
