export const usePreviewAnimation = ({
  throttle,
  setSprings,
  curIndexTmp,
  innerWidth
}) => {
  const setHorizScroll = (offset: number = 0) => {
    setSprings(i => {
      if (i < curIndexTmp - 1 || i > curIndexTmp + 1) {
        return { display: 'none' };
      }
      const x = (i - curIndexTmp) * innerWidth - offset;
      return { x, display: 'flex' };
    });
  };
  return { setHorizScroll };
};
