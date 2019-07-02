/**
 * @Name:
 * @Description:
 * @author RiSusss
 * @date 2019-07-02
 */
import React from 'react';
import styled from 'styled-components';
import SideBar from './SideBar';
import MenuIcon from './MenuIcon';

const Content = styled('div')<{ open: boolean }>`
  padding: 10px;
  ${props => props.open && 'margin-left: 220px'}
  transition: margin-left 0.3s ease;
`;

const MainLayout = ({ children }) => {
  const [sideBarOpen, setSideBarOpen] = React.useState(false);
  return (
    <div>
      <SideBar open={sideBarOpen} />
      <MenuIcon onPress={() => setSideBarOpen(!sideBarOpen)} />
      <Content open={sideBarOpen}>{children}</Content>
    </div>
  );
};

export default MainLayout;
