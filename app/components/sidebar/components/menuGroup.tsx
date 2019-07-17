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
  addFn?: () => void;
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
  display: flex;
  align-items: center;
  font-size: 12px;
  color: var(--gray-161);
  background-color: var(--gray-deep-50);
  z-index: 1;
  line-height: 16px;
`;

const Icon = styled('i')`
  margin-left: 2px;
  font-size: 12px;
  cursor: pointer;
`;

const MenuGroup = ({ name, children, addFn = () => {} }: MenuGroupProps) => (
  <Wrapper>
    <Label>
      {name}
      <Icon onClick={addFn} className="iconfont iconjiahao2" />
    </Label>
    <Container>{children}</Container>
  </Wrapper>
);

export default MenuGroup;
