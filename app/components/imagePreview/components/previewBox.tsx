/**
 * @Name:
 * @Description:
 * @author RiSusss
 * @date 2019-07-02
 */
import React from 'react';
import styled from 'styled-components';
import { initIpcRender, cleanupIpcRender } from '../ipcRender';
import PreviewList from './previewList';
import PreviewProvider from './context';

interface PreviewBoxProps {
  setLayerOpen: (val: boolean) => void;
  images: string[];
  url: string;
}

const Wrapper = styled('div')`
  position: relative;
  overflow: hidden;
  height: 100%;
`;

let listener;

const PreviewBox = ({ setLayerOpen, images, url }: PreviewBoxProps) => {
  const wrapper = React.useRef(null);
  const [boxWidth, setBoxWidth] = React.useState(1800);
  const forceUpdate = React.useState([])[1];
  React.useEffect(() => {
    listener = initIpcRender(listener)({ onResize, onImagesOpen });
    return () => cleanupIpcRender(listener);
  }, []);
  React.useEffect(() => {
    //@ts-ignore
    const innerWidth = wrapper.current.clientWidth;
    if (innerWidth !== boxWidth) {
      setBoxWidth(innerWidth);
    }
  });
  const onResize = () => {
    forceUpdate([]);
  };
  const onImagesOpen = () => {
    setLayerOpen(false);
  };
  return (
    <Wrapper ref={wrapper}>
      <PreviewProvider {...{ boxWidth, setLayerOpen }}>
        <PreviewList {...{ images, url }} />
      </PreviewProvider>
    </Wrapper>
  );
};

export default PreviewBox;
