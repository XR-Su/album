/**
 * @Name:
 * @Description:
 * @author RiSusss
 * @date 2019-07-02
 */
import React from 'react';
import styled from 'styled-components';

interface OverlayerProps {
  children: any;
  isOpen: boolean;
}

const Wrapper = styled('div')`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: var(--gray-deep-36);
  z-index: 1;
  top: 0;
`;

const OverLayer = ({ children, isOpen }: OverlayerProps) => {
  return (
    <React.Fragment>{isOpen ? <Wrapper>{children}</Wrapper> : null}</React.Fragment>
  )
};

export default OverLayer;
