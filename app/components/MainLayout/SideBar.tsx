/**
 * @Name:
 * @Description:
 * @author RiSusss
 * @date 2019-07-02
 */
import React from 'react';
import styled from 'styled-components';
import MenuGroup from './MenuGroup';
import { getFolderTree } from '../../utils';

const Wrapper = styled('div')<{ open: boolean }>`
  position: absolute;
  width: 220px;
  height: 100vh;
  padding: 10px;
  border-right: 1px solid rgb(68, 68, 68);
  background-color: rgb(50, 50, 50);
  ${props => !props.open && 'transform: translate(-220px); '}
  transition: transform 0.3s ease;
`;

interface SideBarProps {
  open: boolean;
}

const SideBar = ({ open }: SideBarProps) => {
  getFolderTree('/Users/richard.su/Documents/tmp');
  return (
    <Wrapper {...{ open }}>
      <MenuGroup name="Folder" />
    </Wrapper>
  );
};

export default SideBar;
