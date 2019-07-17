import React from 'react';
import { useSprings } from 'react-spring';
import { useGesture } from 'react-use-gesture';
import { clamp } from 'lodash';
import { initIpcRender, cleanupIpcRender } from '../ipcRender';

let isScroll: boolean = false;
let throttle: boolean = true;
let scrollDir: [number, number] = [0, 0];
let listener;
let curIndexTmp;

export const usePreviewAnimation = ({
  boxWidth,
  images,
  url,
  setLayerOpen
}) => {
  const [preImages, setPreImages] = React.useState([...images]);
  const [curIndex, setCurIndex] = React.useState(preImages.indexOf(url));
  const forceUpdate = React.useState([])[1];
  const [springs, setSprings] = useSprings(preImages.length, i => {
    // 初始化函数只会调用一次
    const x = (i - curIndex) * boxWidth;
    return i < curIndex - 1 || i > curIndex + 1
      ? { x, display: 'none' }
      : { x, display: 'flex' };
  });
  React.useEffect(() => {
    listener = initIpcRender(listener)({ onScroll, onScrollEnd });
    return () => cleanupIpcRender(listener);
  }, []);
  React.useEffect(() => {
    setHorizScroll();
  });
  const onScroll = val => {
    isScroll = val;
  };

  curIndexTmp = curIndex;
  const onScrollEnd = () => {
    throttle = false;
    curIndexTmp = clamp(curIndexTmp + scrollDir[0], 0, preImages.length - 1);
    setCurIndex(curIndexTmp);
    forceUpdate([]);
  };
  const setHorizScroll = (offset: number = 0) => {
    // 此函数不会引起组件的重渲染
    //@ts-ignore
    setSprings(i => {
      const x = (i - curIndex) * boxWidth - offset;
      return i < curIndex - 1 || i > curIndex + 1
        ? { x, display: 'none' }
        : { x, display: 'flex' };
    });
  };
  const rmCurImg = () => {
    const tmp = [...preImages];
    tmp.splice(curIndex, 1);
    setPreImages(tmp);
  };
  const bind = useGesture({
    onDoubleClick: () => {
      setLayerOpen(false);
    },
    onWheel: ({ delta, wheeling, direction: dir }) => {
      scrollDir = [0, 0];
      if (dir[1] > 0.5) {
        scrollDir[1] = 1;
      } else if (dir[1] < -0.8) {
        scrollDir[1] = -1;
      } else if (dir[0] > 0.5) {
        scrollDir[0] = 1;
      } else if (dir[0] < -0.5) {
        scrollDir[0] = -1;
      }

      let isOffset = false;
      if (wheeling == false) {
        throttle = true; // 以保证拿到正确的值
      }
      if (throttle && wheeling == true && isScroll == true) {
        isOffset = true;
      }
      if (isScroll && isOffset) {
        const offsetX = clamp(delta[0], -300, 300);
        setHorizScroll(offsetX);
      }
    }
  });
  return { bind, rmCurImg, springs };
};

export default { usePreviewAnimation };
