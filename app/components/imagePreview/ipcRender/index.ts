import { ipcRenderer } from 'electron';

interface initIpcRenderProps {
  onScroll?: (val: boolean) => void;
  onScrollStart?: () => void;
  onScrollEnd?: () => void;
}

const initIpcRender = ({
  onScroll = () => {},
  onScrollStart = () => {},
  onScrollEnd = () => {}
}: initIpcRenderProps) => {
  ipcRenderer.removeAllListeners('action');
  ipcRenderer.on('action', (event, arg) => {
    switch (arg) {
      case 'scrollEnd':
        onScroll(false);
        onScrollEnd();
        break;
      case 'scrollStart':
        onScroll(true);
        onScrollStart();
        break;
      default:
    }
  });
};

export default initIpcRender;
