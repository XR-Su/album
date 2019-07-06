/**
 * @Name:
 * @Description:
 * @author RiSusss
 * @date 2019-07-02
 */
import React from 'react';
import { TreeNode } from '../components/tree';

/** interface **/
export interface AppState {
  selectedFolder: TreeNode;
  selectedImage: string;
  isDragging: boolean;
}

/** actions **/
/**
 * Set Selected Folder
 * @param dispatch
 * @param folder
 */
export const setFolderAction = (dispatch, folder: TreeNode) =>
  dispatch({ type: 'SET_SELECTED_FOLDER', folder });

export const setImageAction = (dispatch, image: string) => {
  dispatch({ type: 'SET_SELECTED_IMAGE', image });
};

export const setDragAction = (dispatch, isDrag: boolean) => {
  dispatch({ type: 'SET_DRAG_STATUS', isDrag });
};

/** store **/
export const initialState: AppState = {
  selectedFolder: { name: '', path: '', children: [] },
  selectedImage: '',
  isDragging: false
};

const reducer = (state: AppState, action) => {
  switch (action.type) {
    case 'SET_SELECTED_FOLDER':
      return { ...state, selectedFolder: action.folder };
    case 'SET_SELECTED_IMAGE':
      return { ...state, selectedImage: action.image, isDragging: true };
    case 'SET_DRAG_STATUS':
      return { ...state, isDragging: action.isDrag };
    default:
      return state;
  }
};

const useAppStore = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return { state, dispatch };
};

export default useAppStore;
