/**
 * @Name:
 * @Description:
 * @author RiSusss
 * @date 2019-07-02
 */
import React from 'react';
import styled from 'styled-components';
import Lazyload from 'react-lazyload';
import { setDragAction, setImageAction } from '../../store/appStore';
import { useAppContext } from '../../store/appContext';
import { ipcRenderer } from 'electron';

interface ImageCardProps {
  url: string;
  height: string;
  style?: object;
  setLayerOpen?: (val: boolean) => void;
  setSelectedImg?: (val: string) => void;
}

const Wrapper = styled('div')``;

const Image = styled('img')<{ height: string }>`
  height: ${props => (props.height ? props.height : null)};
  margin: 0 5px 10px 5px;
  user-select: none;
`;

const ImageCard = ({
  url,
  style = {},
  height,
  setLayerOpen = () => {},
  setSelectedImg = () => {}
}: ImageCardProps) => {
  const { dispatch } = useAppContext();
  const handleDBClick = () => {
    setSelectedImg(url);
    setLayerOpen(true);
  };
  const handleDragStart = () => {
    setImageAction(dispatch, url);
    ipcRenderer.send('ondragstart', url);
  };
  const handleDragEnd = () => {
    setDragAction(dispatch, false);
  };

  return (
    <Wrapper
      onDoubleClick={handleDBClick}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <Lazyload height={300} offset={500} once>
        <Image style={style} height={height} src={url} alt="" />
      </Lazyload>
    </Wrapper>
  );
};

export default ImageCard;
