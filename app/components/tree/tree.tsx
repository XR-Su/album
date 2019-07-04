/**
 * @Name:
 * @Description:
 * @author RiSusss
 * @date 2019-07-02
 */
import React from 'react';
import styled from 'styled-components';
import TreeItem from './item';
import TreeProvider from './context';
import { FolderObj } from '../../utils';

export interface TreeNode extends FolderObj {}

interface TreeProps {
  tree: FolderObj[];
  onChange?: (folder: FolderObj) => void;
}

const Wrapper = styled('ul')`
  flex: 1;
  padding-left: 4px;
  margin: 4px 0 4px 0;
`;

const Tree = ({ tree, onChange }: TreeProps) => {
  const renderTreeItem = () => (
    <Wrapper>
      <TreeProvider {...{ onChange }}>
        {tree.map(item => (
          <TreeItem key={item.path} item={item} />
        ))}
      </TreeProvider>
    </Wrapper>
  );
  return renderTreeItem();
};

export default Tree;
