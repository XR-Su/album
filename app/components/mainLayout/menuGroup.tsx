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
  flex: 1;
`;

const Label = styled('p')`
  font-size: 12px;
  color: var(--gray-161);
`;

const MenuGroup = ({ name, children }: MenuGroupProps) => (
  <Wrapper>
    <Label>{name}</Label>
    {children}
  </Wrapper>
);

// @ts-ignore
export default MenuGroup;
