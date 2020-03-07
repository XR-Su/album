/**
 * @Name:
 * @Description: 准备采用 canvas 的方案来显示图片
 * @author RiSusss
 * @date 2019-07-02
 */
import React from 'react';
import { getImageMetaData } from '../../utils';

interface ImageProps {
  src: string;
  options?: any;
  style?: object;
}

const Image = ({ src, options = {}, style = {} }: ImageProps) => {
  const [imgStyle, setImgStyle] = React.useState<object>({});
  React.useEffect(() => {
    initImgStyle();
  }, []);
  const initImgStyle = async () => {
    const { orientation } = await getImageMetaData(src);
    switch (orientation) {
      case 8:
        setImgStyle({ transform: 'rotate(-90deg)' });
        break;
      default:
        setImgStyle({ transform: 'rotate(0deg)' });
    }
  };

  const renderImg = () => {
    let opacity = 0.1;
    if ('transform' in imgStyle) {
      opacity = 1;
    }
    return (
      <img
        src={src}
        {...options}
        style={{ ...imgStyle, ...style, opacity: opacity }}
      />
    );
  };

  return renderImg();
};

export default Image;
