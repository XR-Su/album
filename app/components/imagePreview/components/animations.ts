// import { useGesture } from 'react-use-gesture';
// import { clamp } from 'lodash';

export const usePreviewAnimation = ({ setSprings }) => {
  const setHorizScroll = (
    offset: number = 0,
    curIndex: number,
    width: number
  ) => {
    setSprings(i => {
      if (i < curIndex - 1 || i > curIndex + 1) {
        return { display: 'none' };
      }
      const x = (i - curIndex) * width - offset;
      return { x, display: 'flex' };
    });
  };
  return { setHorizScroll };
};

export default {
  usePreviewAnimation
};
