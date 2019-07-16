/**
 * @Name:
 * @Description:
 * @author RiSusss
 * @date 2019-07-02
 */
import React from 'react';
import { useSprings } from 'react-spring';
import { useGesture } from 'react-use-gesture';
import { clamp } from 'lodash';
import PreviewContent from './previewContent';
import initIpcRenderer from '../ipcRender';

let isScroll: boolean = false;
let throttle: boolean = true;
let scrollDir: [number, number] = [0, 0];
let listener;

const PreviewEvents = ({ boxWidth, images, url, setLayerOpen }) => {
  const [preImages, setPreImages] = React.useState([...images]);
  const [curIndex, setCurIndex] = React.useState(preImages.indexOf(url));
  const [springs, setSprings] = useSprings(preImages.length, i => {
    // 初始化函数只会调用一次
    const x = (i - curIndex) * boxWidth;
    if (i < curIndex - 1 || i > curIndex + 1) {
      return { x, display: 'none' };
    }
    return { x, display: 'flex' };
  });
  React.useEffect(() => {
    listener = initIpcRenderer(listener)({ onScroll, onScrollEnd });
  }, []);
  React.useEffect(() => {
    setHorizScroll();
  });

  const onScroll = val => {
    isScroll = val;
  };
  let curIndexTmp = curIndex;
  const onScrollEnd = () => {
    throttle = false;
    if (scrollDir[1] == -1) {
      setLayerOpen(false);
    } else {
      curIndexTmp = clamp(curIndexTmp + scrollDir[0], 0, preImages.length - 1);
      // 问题：onScrollEnd 中 curIndex 被缓存，不会读取新的值。
      // const index = clamp(curIndex + scrollDir[0], 0, preImages.length - 1);
      setCurIndex(curIndexTmp);
      // setHorizScroll();
    }
  };
  const setHorizScroll = (offset: number = 0) => {
    //@ts-ignore
    setSprings(i => {
      const x = (i - curIndex) * boxWidth - offset;
      if (i < curIndex - 1 || i > curIndex + 1) {
        return { x, display: 'none' };
      }
      return { x, display: 'flex' };
    });
  };
  const bind = useGesture({
    onWheel: ({ delta, wheeling, direction: dir }) => {
      scrollDir = [0, 0];
      if (dir[1] > 0.5) {
        scrollDir[1] = 1;
      } else if (dir[1] < -0.5) {
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
  return (
    <PreviewContent {...{ springs, preImages, curIndex, bind, setPreImages }} />
  );
};

export default PreviewEvents;
