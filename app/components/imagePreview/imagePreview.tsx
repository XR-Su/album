/**
 * @Name:
 * @Description:
 * @author RiSusss
 * @date 2019-07-02
 */
import React from 'react';
import styled from 'styled-components';
import { useGesture } from 'react-use-gesture';

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
  const myRef = React.useRef(null);
  const bind = useGesture(
    {
      onWheel: ({ delta }) => {
        if (delta[1] < -120) {
          setLayerOpen(false);
        }
      }
    },
    { domTarget: myRef }
  );
  React.useEffect(bind, [bind]);
  return (
    <Wrapper>
      <Image ref={myRef} src={url} id="preview_image" />
    </Wrapper>
  );
};

export default ImagePreview;
