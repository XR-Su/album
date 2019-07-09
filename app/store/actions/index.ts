/** actions **/
/**
 * Set Selected Folder
 * @param dispatch
 * @param folder
 */
import { FolderObj } from '../../utils';

/**
 * set current selected folder
 * @param folder
 */
export const setSelectedFolderAction = (folder: FolderObj) => ({
  type: 'SET_SELECTED_FOLDER',
  folder
});

/**
 * set current selected images
 * @param images
 */
export const setSelectedImagesAction = (images: string[]) => ({
  type: 'SET_SELECTED_IMAGES',
  images
});

/**
 * set current selected image
 * @param image
 */
export const setDragImageAction = (image: string) => ({
  type: 'SET_DRAGGED_IMAGE',
  image
});

/**
 * set drag status
 * @param isDrag
 */
export const setDragStatusAction = (isDrag: boolean) => ({
  type: 'SET_DRAG_STATUS',
  isDrag
});
