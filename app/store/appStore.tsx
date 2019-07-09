/**
 * @Name:
 * @Description:
 * @author RiSusss
 * @date 2019-07-02
 */
import React from 'react';
import { TreeNode } from '../components/tree';
import reducer from './reducers';

/** interface **/
export interface AppState {
  selectedFolder: TreeNode;
  selectedImages: string[];
  draggedImage: string;
  isDragging: boolean;
}

/** store **/
export const initialState: AppState = {
  selectedFolder: { name: '', path: '', children: [] },
  selectedImages: [],
  draggedImage: '',
  isDragging: false
};

const useAppStore = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return { state, dispatch };
};

export default useAppStore;
