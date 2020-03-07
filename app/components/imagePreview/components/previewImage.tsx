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
import { usePreViewContext } from './context';
import Image from '../../image';
import ToolBar from './toolBar';
import {
  setDragImageAction,
  setDragStatusAction
} from '../../../store/actions';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  overflow: auto;
`;

//${props => `transform-origin: ${props.origin[0]}px ${props.origin[1]}px`}
// const Image = styled('img')<{ scale: number }>`
//   max-height: 100%;
//   max-width: 100%;
//   transform-origin: center center;
//   ${props => `transform: scale(${props.scale})`}
// `;

const ImageStyle = {
  maxHeight: '100%',
  maxWidth: '100%',
  transformOrigin: 'center center'
};

interface ImageProps {
  url: string;
  rmCurImg: () => void;
  getCurImg: () => string;
}

const initDispatch = dispatch => ({
  dispatchDrImg: (image: string) => dispatch(setDragImageAction(image)),
  dispatchDrStatus: (isDrag: boolean) => dispatch(setDragStatusAction(isDrag))
});

// let orgWidth = 0;
let preWidth: number = 0;
const PreviewImage = ({ url, getCurImg, rmCurImg }: ImageProps) => {
  const imgRef = React.useRef(null);
  const [orgWidth, setOrgWidth] = React.useState(0);
  const [imgScale, setImgScale] = React.useState(1);
  const forceUpdate = React.useState([])[1];
  const { boxWidth } = usePreViewContext();
  const { dispatch } = useAppContext();
  const { dispatchDrImg, dispatchDrStatus } = initDispatch(dispatch);
  React.useEffect(() => {
    if (getCurImg() == url) {
      //@ts-ignore
      setOrgWidth(imgRef.current.clientWidth);
    }
  });
  const bind = useGesture({
    // onMouseMove: e => {
    //   //@ts-ignore
    //   const rect = imgRef.current.getBoundingClientRect();
    //   imgOrigin[0] = e.clientX - rect.left;
    //   imgOrigin[1] = e.clientY - rect.top;
    // },
    onPinch: ({ delta }) => {
      //@ts-ignore
      const rect = imgRef.current.getBoundingClientRect();
      let scale: number = 1;
      if (preWidth + delta[0] <= orgWidth) {
        scale = 1;
        preWidth = orgWidth;
      } else if (rect.width + delta[0] >= boxWidth) {
        scale = boxWidth / orgWidth;
        preWidth = boxWidth;
      } else {
        scale = (preWidth + delta[0] / 2) / orgWidth;
        preWidth += delta[0] / 2;
      }
      setImgScale(scale);
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
    <Wrapper>
      <Image
        src={url}
        style={ImageStyle}
        options={{
          ref: imgRef,
          ...bind(),
          onDragStart: handleDragStart,
          onDragEnd: handleDragEnd
        }}
      />
      <ToolBar img={url} previewUpdate={forceUpdate} />
    </Wrapper>
  );
};

export default PreviewImage;
