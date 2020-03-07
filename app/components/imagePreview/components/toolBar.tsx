/**
 * @Name:
 * @Description:
 * @author RiSusss
 * @date 2019-07-02
 */
import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

const sharp = require('sharp');

interface ToolBarProps {
  img: string;
  previewUpdate: (val: []) => void;
}

const Wrapper = styled(animated.div)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  top: 0;
  right: 0;
  position: absolute;
  background-color: var(--gray-deep-36);
  border-left: 1px solid rgb(68, 68, 68);
  width: 40px;
  height: 100%;
  padding-top: 12px;
`;

const Icon = styled.i`
  color: var(--gray-161);
  cursor: pointer;
  font-size: 20px;
`;

let timer;

const ToolBar = ({ img, previewUpdate }: ToolBarProps) => {
  const [isShow, setShow] = React.useState<boolean>(false);
  const spring = useSpring({ opacity: isShow ? 1 : 0 });

  const handleClickRotate = () => {
    sharp(img)
      .metadata()
      .then(metadata => {
        console.log(metadata.orientation);
      });
  };

  const bind = {
    onMouseOver: () => {
      if (!timer) {
        timer = setTimeout(() => {
          setShow(true);
        }, 500);
      }
    },
    onMouseLeave: () => {
      clearTimeout(timer);
      timer = '';
      setShow(false);
    }
  };
  return (
    <Wrapper {...bind} style={spring}>
      <Icon onClick={handleClickRotate} className="iconfont iconrotate-left" />
    </Wrapper>
  );
};

export default ToolBar;
