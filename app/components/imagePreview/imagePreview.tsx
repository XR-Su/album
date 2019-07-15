/**
 * @Name:
 * @Description:
 * @author RiSusss
 * @date 2019-07-02
 */
import React from 'react';
import { ipcRenderer } from 'electron';
import styled from 'styled-components';
import { useGesture } from 'react-use-gesture';
import { useSprings, animated } from 'react-spring';
import { clamp } from 'lodash';
import initIpcRender from './ipcRender';
import { setDragImageAction, setDragStatusAction } from '../../store/actions';
import { useAppContext } from '../../store/appContext';

interface ImagePreviewProps {
  url: string;
  setLayerOpen: (val: boolean) => void;
  images: string[];
}

const Wrapper = styled('div')`
  position: relative;
  overflow: hidden;
  height: 100%;
`;

const ImageContainer = styled(animated.div)`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

const Image = styled('img')`
  max-height: 100%;
  max-width: 100%;
`;

const initDispatch = dispatch => ({
  dispatchDrImg: (image: string) => dispatch(setDragImageAction(image)),
  dispatchDrStatus: (isDrag: boolean) => dispatch(setDragStatusAction(isDrag))
});

let innerWidth: number = 0;
let curIndexTmp: number = 0;
let isScroll: boolean = false;
let scrollDir: [number, number] = [0, 0];
let throttle: boolean = true;

const ImagePreview = ({ url, setLayerOpen, images }: ImagePreviewProps) => {
  const wrapper = React.useRef(null);
  const [preImages, setPreImages] = React.useState(images);
  const [curIndex, setCurIndex] = React.useState(preImages.indexOf(url));
  const { dispatch } = useAppContext();
  const { dispatchDrImg, dispatchDrStatus } = initDispatch(dispatch);
  //@ts-ignore
  const [springs, setSprings] = useSprings(preImages.length, i => ({
    // 这里的参数是传入的，所以参数一旦改变，useSprings 内部肯定会刷新？如果内部用的 useState喃？
    // 要看组件内部是否使用 useState 来存储变量
    x: (i - curIndex) * 1800,
    display: 'flex'
  }));

  React.useEffect(() => {
    curIndexTmp = curIndex;
    initIpcRender({ onScroll, onScrollEnd, onResize, onImagesOpen });
  }, []);

  React.useEffect(() => {
    // recalculate the position of the images
    //@ts-ignore
    innerWidth = wrapper.current.clientWidth;
    setHorizScroll();
  });

  const onImagesOpen = () => {
    setLayerOpen(false);
  };

  const onScroll = val => {
    isScroll = val;
  };

  const onScrollEnd = () => {
    throttle = false;
    if (scrollDir[1] == -1) {
      setLayerOpen(false);
    } else {
      curIndexTmp = clamp(curIndexTmp + scrollDir[0], 0, preImages.length - 1);
      setHorizScroll();
    }
  };

  const onResize = () => {
    setCurIndex(curIndexTmp);
    setPreImages([...preImages]);
  };

  const handleDragStart = () => {
    dispatchDrImg(url);
    ipcRenderer.send('ondragstart', preImages[curIndexTmp]);
  };
  const handleDragEnd = () => {
    dispatchDrStatus(false);
    const tmp = [...preImages];
    tmp.splice(curIndexTmp, 1);
    setCurIndex(curIndexTmp);
    setPreImages(tmp);
  };
  const setHorizScroll = (offset: number = 0) => {
    //@ts-ignore
    setSprings(i => {
      if (i < curIndexTmp - 1 || i > curIndexTmp + 1) {
        return { display: 'none' };
      }
      const x = (i - curIndexTmp) * innerWidth - offset;
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
      // scrollDir = direction[0] > 0 ? 1 : -1;
      // console.log('direction', direction);
      // 问题：上次操作，scrollEnd 后 delta 依然在递增或递减，下次再 scrollEnd 到来的太快就会按照上次 delta 的值，进行 slide
      // wheel 这个操作本身的问题
      // 解决方法：wheelingStart 开始获取新值，scrollEnd 获取最后的值并清空, wheelingEnd 可重新获取值

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
    <Wrapper ref={wrapper}>
      {springs.map(({ x, display }, i) => (
        <ImageContainer
          {...bind()}
          key={i}
          style={{
            display,
            transform: x.interpolate(offset => `translate3d(${offset}px,0,0)`)
          }}
        >
          <Image
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            src={preImages[i]}
          />
        </ImageContainer>
      ))}
    </Wrapper>
  );
};

export default ImagePreview;
