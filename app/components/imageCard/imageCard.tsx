/**
 * @Name:
 * @Description:
 * @author RiSusss
 * @date 2019-07-02
 */
import React from 'react';
import styled from 'styled-components';

interface ImageCardProps {
  url: string;
  height: string;
  style?: object;
  setLayerOpen?: (val: boolean) => void;
  setSelectedImg?: (val: string) => void;
}

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
  const handleClick = () => {
    setSelectedImg(url);
    setLayerOpen(true);
  };
  return (
    <div>
      <Image
        onClick={handleClick}
        style={style}
        height={height}
        src={url}
        alt=""
      />
    </div>
  );
};

export default ImageCard;
