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
}

/** actions **/
/**
 * Set Selected Folder
 * @param dispatch
 * @param folder
 */
export const setFolderAction = (dispatch, folder) =>
  dispatch({ type: 'SET_SELECTED_FOLDER', folder });

/** store **/
const initialState: AppState = {
  selectedFolder: { name: '', path: '', children: [] }
};

const reducer = (state: AppState, action) => {
  switch (action.type) {
    case 'SET_SELECTED_FOLDER':
      return { ...state, selectedFolder: action.folder };
    default:
      return state;
  }
};

const useAppStore = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return { state, dispatch };
};

export default useAppStore;
