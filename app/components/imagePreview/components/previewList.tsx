/**
 * @Name:
 * @Description:
 * @author RiSusss
 * @date 2019-07-02
 */
import React from 'react';
import styled from 'styled-components';
import { animated } from 'react-spring';
import PreviewImage from './previewImage';
import { usePreviewAnimation } from './animations';
import { usePreViewContext } from './context';

interface previewListProps {
  images: string[];
  url: string;
}

const ImageContainer = styled(animated.div)`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow: auto;
`;

const PreviewList = ({ images, url }: previewListProps) => {
  const { boxWidth, setLayerOpen } = usePreViewContext();
  const { springs, bind, rmCurImg, getCurImg } = usePreviewAnimation({
    boxWidth,
    images,
    url,
    setLayerOpen
  });
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
          <PreviewImage url={images[i]} {...{ rmCurImg, getCurImg }} />
        </ImageContainer>
      ))}
    </React.Fragment>
  );
};

export default PreviewList;
