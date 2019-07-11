import React from 'react';
import { useGesture } from 'react-use-gesture';
import { useSpring, interpolate } from 'react-spring';
import { clamp } from 'lodash';
import colors from '../../../constants/colors';

export const useMarkAnimation = ({ isImgEnter, isFolderExisted }) => {
  const [offset, setOffset] = React.useState(0);

  /** gesture init **/
  const bind = useGesture({
    onWheel: ({ delta }) => {
      setOffset(clamp(-delta[0], -40, 0));
    }
  });

  /** animation init **/
  const translate = () => {
    if (isImgEnter) {
      return 24;
    }
    return offset < -20 ? -40 : 0;
  };
  const { markOffset } = useSpring({
    markOffset: translate()
  });

  /** animation style **/
  const markStyle = () => {
    const style = {
      transform: interpolate(
        [markOffset],
        markOffset => `translate3d(${markOffset}px,0,0)`
      )
    };
    return isFolderExisted
      ? {
          style: {
            ...style,
            color: markOffset.interpolate({
              range: [0, 24],
              output: [colors.FONT_COLOR, colors.POSITIVE_COLOR]
            })
          }
        }
      : {
          style
        };
  };
  const wrapperStyle = () => {
    const style = {
      color: colors.NEGATIVE_COLOR,
      borderColor: colors.NEGATIVE_COLOR_SUB
    };
    return isFolderExisted
      ? {
          style: {
            ...style,
            borderColor: markOffset.interpolate({
              // @ts-ignore
              range: [0, 24],
              output: [colors.BORDER_COLOR, colors.POSITIVE_COLOR],
              extrapolate: 'clamp'
            })
          }
        }
      : {
          style
        };
  };
  return { bind, markOffset, markStyle, wrapperStyle };
};

export default {
  useMarkAnimation
};
