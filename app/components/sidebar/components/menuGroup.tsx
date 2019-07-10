/**
 * @Name:
 * @Description:
 * @author RiSusss
 * @date 2019-07-02
 */
import React from 'react';
import styled from 'styled-components';

interface MenuGroupProps {
  name: string;
  children: any;
}

const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  flex-shrink: 1;
`;

const Container = styled.div`
  flex: 1;
  overflow: auto;
`;

const Label = styled('p')`
  font-size: 12px;
  color: var(--gray-161);
  background-color: var(--gray-deep-50);
  z-index: 1;
  line-height: 16px;
`;

const MenuGroup = ({ name, children }: MenuGroupProps) => (
  <Wrapper>
    <Label>{name}</Label>
    <Container>{children}</Container>
  </Wrapper>
);

export default MenuGroup;
