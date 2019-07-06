/**
 * @Name:
 * @Description:
 * @author RiSusss
 * @date 2019-07-02
 */
import React from 'react';
import styled from 'styled-components';
import Hammer from 'hammerjs';

interface ImagePreviewProps {
  url: string;
  setLayerOpen?: (val: boolean) => void;
}

const Wrapper = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  height: 100%;
`;

const Image = styled('img')`
  max-height: 100%;
  max-width: 100%;
`;

const ImagePreview = ({ url, setLayerOpen = () => {} }: ImagePreviewProps) => {
  React.useEffect(() => {
    const img = document.querySelector('#preview_image');
    const manager = new Hammer.Manager(img);
    const Swipe = new Hammer.Swipe({});
    manager.add(Swipe);
    manager.on('swipe', e => {
      if (e.deltaY > 120) {
        setLayerOpen(false);
      }
    });
  }, ['DidMount']);
  return (
    <Wrapper>
      <Image src={url} id="preview_image" />
    </Wrapper>
  );
};

export default ImagePreview;
