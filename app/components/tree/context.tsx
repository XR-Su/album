/**
 * @Name:
 * @Description:
 * @author RiSusss
 * @date 2019-07-02
 */
import React from 'react';
import { TreeNode } from './tree';

interface TreeProviderProps {
  onChange?: (folder: TreeNode) => void;
  children: any;
}

interface TreeContext {
  selected: TreeNode;
  setSelected: (folder: TreeNode) => void;
  onChange?: (folder: TreeNode) => void;
  expandedMap: object;
  setExpandedMap: (map: object) => void;
}

const initialState = { name: '', path: '', children: [] };

export const TreeContext = React.createContext<TreeContext>({
  selected: initialState,
  setSelected: () => {},
  onChange: () => {},
  expandedMap: {},
  setExpandedMap: () => {}
});

export const useTreeContext = () => React.useContext(TreeContext);

const TreeProvider = ({ children, onChange }: TreeProviderProps) => {
  const [selected, setSelected] = React.useState<TreeNode>(initialState);
  const [expandedMap, setExpandedMap] = React.useState<object>({});
  return (
    <TreeContext.Provider
      value={{ selected, setSelected, onChange, expandedMap, setExpandedMap }}
    >
      {children}
    </TreeContext.Provider>
  );
};

export default TreeProvider;
