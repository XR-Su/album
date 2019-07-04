/**
 * @Name:
 * @Description:
 * @author RiSusss
 * @date 2019-07-02
 */
import React from 'react';
import styled from 'styled-components';
import { useTreeContext } from './context';
import { TreeNode } from './tree';

interface ItemProps {
  item: TreeNode;
}

const Wrapper = styled('li')`
  user-select: none;
`;
const Container = styled('ul')<{ expanded: boolean }>`
  padding-left: 10px;
  ${props => (props.expanded ? '' : 'display: none')}
`;
const Label = styled('p')`
  position: relative;
  padding-left: 16px;
  color: var(--gray-224);
  height: 25px;
  cursor: pointer;
`;
const Arrow = styled('i')`
  position: absolute;
  left: 0;
  top: 0;
  font-size: 16px;
  color: var(--gray-161);
  margin-right: 1px;
`;
const Icon = styled('i')`
  font-size: 14px;
  color: var(--gray-161);
  margin-right: 6px;
`;

const Item = ({ item }: ItemProps) => {
  const {
    setSelected,
    onChange,
    expandedMap,
    setExpandedMap
  } = useTreeContext();

  const handleClick = () => {
    setSelected(item);
    onChange && onChange(item);
  };
  const handleExpand = e => {
    e.stopPropagation();
    const newMap = { ...expandedMap };
    newMap[item.path] = !expandedMap[item.path];
    setExpandedMap(newMap);
  };
  const renderChildren = () => {
    return item.children.length > 0
      ? item.children.map(child => <Item key={child.path} item={child} />)
      : null;
  };
  const renderArrow = () => {
    return (
      <Arrow
        onClick={handleExpand}
        className={`iconfont ${
          expandedMap[item.path] ? 'iconicon_sanjiaoxing' : 'iconjiantou1'
        }`}
      />
    );
  };
  return (
    <Wrapper>
      <Label onClick={handleClick}>
        {item.children.length > 0 ? renderArrow() : null}
        <Icon className="iconfont iconios-albums" />
        {item.name}
      </Label>
      <Container expanded={expandedMap[item.path]}>
        {renderChildren()}
      </Container>
    </Wrapper>
  );
};

export default Item;
