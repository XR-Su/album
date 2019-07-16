/**
 * @Name:
 * @Description:
 * @author RiSusss
 * @date 2019-07-02
 */
import React from 'react';
import styled from 'styled-components';
import initIpcRender from '../ipcRender';
import PreviewEvent from './previewEvents';

const Wrapper = styled('div')`
  position: relative;
  overflow: hidden;
  height: 100%;
`;

let listener;

const PreviewBox = ({ setLayerOpen, images, url }) => {
  const wrapper = React.useRef(null);
  const [boxWidth, setBoxWidth] = React.useState(1800);
  const [update, forceUpdate] = React.useState(false);
  React.useEffect(() => {
    // initIpcRender({ onResize, onImagesOpen });
    listener = initIpcRender(listener)({ onResize, onImagesOpen });
  }, []);
  React.useEffect(() => {
    //@ts-ignore
    const innerWidth = wrapper.current.clientWidth;
    if (innerWidth !== boxWidth) {
      setBoxWidth(innerWidth);
    }
  });

  const onResize = () => {
    forceUpdate(!update);
  };
  const onImagesOpen = () => {
    setLayerOpen(false);
  };
  return (
    <Wrapper ref={wrapper}>
      <PreviewEvent {...{ boxWidth, images, url, setLayerOpen }} />
    </Wrapper>
  );
};

export default PreviewBox;
