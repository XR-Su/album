/**
 * @Name:
 * @Description:
 * @author RiSusss
 * @date 2019-07-02
 */
import React from 'react';
import styled from 'styled-components';
import { ipcRenderer } from 'electron';
import { animated } from 'react-spring';
import { useAppContext } from '../../../store/appContext';
import {
  setDragImageAction,
  setDragStatusAction
} from '../../../store/actions';

const ImageContainer = styled(animated.div)`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

const Image = styled('img')`
  max-height: 100%;
  max-width: 100%;
`;

const initDispatch = dispatch => ({
  dispatchDrImg: (image: string) => dispatch(setDragImageAction(image)),
  dispatchDrStatus: (isDrag: boolean) => dispatch(setDragStatusAction(isDrag))
});

const PreviewContent = ({
  springs,
  bind,
  preImages,
  curIndex,
  setPreImages
}) => {
  const { dispatch } = useAppContext();
  const { dispatchDrImg, dispatchDrStatus } = initDispatch(dispatch);
  const handleDragStart = () => {
    dispatchDrImg(preImages[curIndex]);
    ipcRenderer.send('ondragstart', preImages[curIndex]);
  };
  const handleDragEnd = () => {
    dispatchDrStatus(false);
    const tmp = [...preImages];
    tmp.splice(curIndex, 1);
    setPreImages(tmp);
  };
  return (
    <React.Fragment>
      {springs.map(({ x, display }, i) => (
        <ImageContainer
          {...bind()}
          key={i}
          style={{
            display,
            transform: x.interpolate(offset => `translate3d(${offset}px,0,0)`)
          }}
        >
          <Image
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            src={preImages[i]}
          />
        </ImageContainer>
      ))}
    </React.Fragment>
  );
};

export default PreviewContent;
