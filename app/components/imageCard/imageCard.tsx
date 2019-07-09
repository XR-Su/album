/**
 * @Name:
 * @Description:
 * @author RiSusss
 * @date 2019-07-02
 */
import React from 'react';
import styled from 'styled-components';
import Lazyload from 'react-lazyload';
import {
  setDragStatusAction,
  setDragImageAction,
  setSelectedImagesAction
} from '../../store/actions';
import { useAppContext } from '../../store/appContext';
import { ipcRenderer } from 'electron';

interface ImageCardProps {
  url: string;
  height: string;
  style?: object;
  setLayerOpen?: (val: boolean) => void;
  setSelectedImg?: (val: string) => void;
  selectMode: boolean;
  onClick?: (image: string) => void;
}

const Wrapper = styled('div')``;

const Image = styled('img')<{ height: string; isSelected: boolean }>`
  height: ${props => (props.height ? props.height : null)};
  margin: 0 4px 8px 4px;
  user-select: none;
  border: 2px solid;
  ${props =>
    props.isSelected
      ? 'border-color: rgb(84, 138, 197)'
      : 'border-color: transparent'}
`;

const initDispatch = dispatch => ({
  dispatchDrImg: (image: string) => dispatch(setDragImageAction(image)),
  dispatchDrStatus: (isDrag: boolean) => dispatch(setDragStatusAction(isDrag)),
  dispatchSelImgs: (images: string[]) =>
    dispatch(setSelectedImagesAction(images))
});

const ImageCard = React.memo(
  ({
    url,
    style = {},
    height,
    setLayerOpen = () => {},
    setSelectedImg = () => {},
    onClick = () => {},
    selectMode
  }: ImageCardProps) => {
    const { dispatch, state: app } = useAppContext();
    const { dispatchDrImg, dispatchDrStatus, dispatchSelImgs } = initDispatch(
      dispatch
    );
    const isSelected = app.selectedImages.indexOf(url) != -1;

    const handleClick = () => {
      if (selectMode) {
        let selectedImages: string[] = app.selectedImages;
        if (isSelected) {
          selectedImages.splice(selectedImages.indexOf(url), 1);
        } else {
          selectedImages = [...selectedImages, url];
        }
        dispatchSelImgs(selectedImages);
      }
      onClick(url);
    };
    const handleDBClick = () => {
      if (!selectMode) {
        setSelectedImg(url);
        setLayerOpen(true);
      }
    };
    const handleDragStart = () => {
      dispatchDrImg(url);
      ipcRenderer.send('ondragstart', url);
    };
    const handleDragEnd = () => {
      dispatchDrStatus(false);
    };

    return (
      <Wrapper
        onClick={handleClick}
        onDoubleClick={handleDBClick}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <Lazyload height={300} offset={500} once>
          <Image
            style={style}
            height={height}
            isSelected={isSelected}
            src={url}
            alt=""
          />
        </Lazyload>
      </Wrapper>
    );
  }
);

export default ImageCard;
