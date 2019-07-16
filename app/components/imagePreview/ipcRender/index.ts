import { ipcRenderer } from 'electron';

interface initIpcRenderProps {
  onScroll?: (val: boolean) => void;
  onScrollStart?: () => void;
  onScrollEnd?: () => void;
  onResize?: () => void;
  onImagesOpen?: () => void;
}

const initIpcRender = listener => {
  return ({
    onScroll = () => {},
    onScrollStart = () => {},
    onScrollEnd = () => {},
    onResize = () => {},
    onImagesOpen = () => {}
  }: initIpcRenderProps) => {
    if (listener) {
      // avoid to
      ipcRenderer.removeListener('action', listener);
    }
    listener = (event, arg) => {
      switch (arg) {
        case 'scrollEnd':
          onScroll(false);
          onScrollEnd();
          break;
        case 'scrollStart':
          onScroll(true);
          onScrollStart();
          break;
        case 'resize':
          onResize();
          break;
        case 'maximize':
          onResize();
          break;
        case 'imagesOpen':
          onImagesOpen();
          break;
        default:
          console.log('preview no action');
      }
    };
    ipcRenderer.on('action', listener);
    return listener;
  };
};

export default initIpcRender;
