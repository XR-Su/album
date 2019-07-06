/**
 * @Name:
 * @Description:
 * @author RiSusss
 * @date 2019-07-02
 */
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled('div')`
  padding: 10px;
  position: fixed;
  right: 6px;
  top: 4px;
  cursor: pointer;
  z-index: 1;
`;

const Icon = styled('i')`
  font-size: 20px;
`;

interface MenuIconProps {
  onPress: () => void;
}

const MenuIcon = ({ onPress }: MenuIconProps) => {
  return (
    <Wrapper onClick={onPress}>
      <Icon className="iconfont iconcaidan" />
    </Wrapper>
  );
};

export default MenuIcon;
