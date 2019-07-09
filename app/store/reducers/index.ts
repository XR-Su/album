import { AppState } from '../appStore';

const reducer = (state: AppState, action) => {
  switch (action.type) {
    case 'SET_SELECTED_FOLDER':
      return { ...state, selectedFolder: action.folder };
    case 'SET_SELECTED_IMAGES':
      return { ...state, selectedImages: action.images };
    case 'SET_DRAGGED_IMAGE':
      return { ...state, draggedImage: action.image, isDragging: true };
    case 'SET_DRAG_STATUS':
      return { ...state, isDragging: action.isDrag };
    default:
      return state;
  }
};

export default reducer;
