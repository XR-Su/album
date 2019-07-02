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
}

const Wrapper = styled('div')`
  flex: 1;
`;

const Label = styled('p')`
  font-size: 12px;
  color: rgb(161, 161, 161);
`;

const MenuGroup = ({ name }: MenuGroupProps) => (
  <Wrapper>
    <Label>{name}</Label>
  </Wrapper>
);

export default MenuGroup;
