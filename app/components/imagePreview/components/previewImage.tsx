/**
 * @Name:
 * @Description:
 * @author RiSusss
 * @date 2019-07-02
 */
import React from 'react';
import styled from 'styled-components';
import { ipcRenderer } from 'electron';
import { useGesture } from 'react-use-gesture';
import { useAppContext } from '../../../store/appContext';
import {
  setDragImageAction,
  setDragStatusAction
} from '../../../store/actions';

const Image = styled('img')<{ scale: number; origin: number[] }>`
  max-height: 100%;
  max-width: 100%;
  ${props => `transform-origin: ${props.origin[0]}px ${props.origin[1]}px`}
  ${props => `transform: scale(${props.scale})`}
`;

interface ImageProps {
  url: string;
  rmCurImg: () => void;
}

const initDispatch = dispatch => ({
  dispatchDrImg: (image: string) => dispatch(setDragImageAction(image)),
  dispatchDrStatus: (isDrag: boolean) => dispatch(setDragStatusAction(isDrag))
});

let orgWidth = 0;
let preWidth = 0;
let imgOrigin = [0, 0];
const PreviewImage = ({ url, rmCurImg }: ImageProps) => {
  const imgRef = React.useRef(null);
  const [imgScale, setImgScale] = React.useState(1);
  const { dispatch } = useAppContext();
  const { dispatchDrImg, dispatchDrStatus } = initDispatch(dispatch);
  React.useEffect(() => {
    //@ts-ignore
    orgWidth = imgRef.current.clientWidth;
    preWidth = orgWidth;
  }, []);
  const bind = useGesture({
    onMouseMove: e => {
      //@ts-ignore
      const rect = imgRef.current.getBoundingClientRect();
      imgOrigin[0] = e.clientX - rect.left;
      imgOrigin[1] = e.clientY - rect.top;
    },
    onPinch: ({ delta }) => {
      if (preWidth + delta[0] < orgWidth) {
        setImgScale(1);
      } else {
        setImgScale((preWidth + delta[0] / 2) / orgWidth);
        preWidth += delta[0] / 2;
      }
    }
  });
  const handleDragStart = () => {
    dispatchDrImg(url);
    ipcRenderer.send('ondragstart', url);
  };
  const handleDragEnd = () => {
    dispatchDrStatus(false);
    rmCurImg();
  };
  return (
    <Image
      ref={imgRef}
      {...bind()}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      src={url}
      scale={imgScale}
      origin={imgOrigin}
    />
  );
};

export default PreviewImage;
