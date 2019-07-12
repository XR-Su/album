// @flow
import React from 'react';
// import { Link } from 'react-router-dom';
// import routes from '../constants/routes';
import styled from 'styled-components';
import { uniq } from 'lodash';
import ImageCard from '../../components/imageCard';
import OverLayer from '../../components/overLayer';
import ImagePreview from '../../components/imagePreview';
import { useAppContext } from '../../store/appContext';
import { getFolderFiles } from '../../utils';
import { setSelectedImagesAction } from '../../store/actions';

const Wrapper = styled('div')`
  position: relative;
  height: 100%;
`;
const Gallery = styled('div')`
  display: flex;
  flex-direction: column;
  padding: 10px;
  height: 100%;
`;
const ImagesContainer = styled('div')`
  margin: 4px 0 0 -3px;
  display: flex;
  flex-wrap: wrap
  justify-content: flex-start;
  flex: 1;
  align-content: start;
  overflow-y: auto;
  font-size: 0;
`;

const ImageStance = styled('i')`
  width: 200px;
`;

const Title = styled('h2')`
  padding-right: 30px;
  text-overflow: ellipsis;
  overflow: hidden;
`;

let selRange: string[] = [];

const initDispatch = dispatch => ({
  dispatchSelImgs: (images: string[]) =>
    dispatch(setSelectedImagesAction(images))
});

const HomePage = () => {
  const [isLayerOpen, setLayerOpen] = React.useState<boolean>(false);
  const [selectedImg, setSelectedImg] = React.useState<string>('');
  const [isCmdDown, setCmdStatus] = React.useState<boolean>(false);
  const [isShiftDown, setShiftStatus] = React.useState<boolean>(false);
  const { state: app, dispatch } = useAppContext();
  const { images } = getFolderFiles(app.selectedFolder.path);
  const { dispatchSelImgs } = initDispatch(dispatch);

  React.useEffect(() => {
    const setKeyStatus = (keyCode: number, status: boolean) => {
      switch (keyCode) {
        case 91:
          setCmdStatus(status);
          break;
        case 16:
          setShiftStatus(status);
          break;
      }
    };
    document.addEventListener('keydown', e => {
      setKeyStatus(e.keyCode, true);
    });
    document.addEventListener('keyup', e => {
      setKeyStatus(e.keyCode, false);
    });
  }, ['DidMount']);

  const onImgCardClick = (img: string) => {
    let selImgs = [img];
    if (isShiftDown) {
      if (selRange.length == 0) {
        selRange[0] = img;
      } else if (selRange.indexOf(img) != -1) {
        // cancel the first selection.
        selRange.splice(selRange.indexOf(img), 1);
      } else {
        // calculate images in the range.
        selRange[1] = img;
        let li = images.indexOf(selRange[0]),
          ri = images.indexOf(selRange[1]);
        selImgs = images.slice(Math.min(li, ri), Math.max(li, ri) + 1);
        selRange = [];
      }
      dispatchSelImgs(uniq([...selImgs, ...app.selectedImages]));
    } else if (isCmdDown) {
      selRange = [];
    }
  };

  return (
    <Wrapper className="wrapper">
      <Gallery className="gallery">
        <Title>{app.selectedFolder.name || 'welcome!'}</Title>
        <ImagesContainer>
          {images.map(image => (
            <ImageCard
              {...{ setSelectedImg, setLayerOpen }}
              key={image}
              url={image}
              height="30vh"
              onClick={onImgCardClick}
              selectMode={isCmdDown || isShiftDown}
            />
          ))}
          {[1, 2, 3, 4, 5].map(val => (
            <ImageStance key={val} />
          ))}
        </ImagesContainer>
      </Gallery>
      <OverLayer isOpen={isLayerOpen}>
        <ImagePreview url={selectedImg} {...{ setLayerOpen, images }} />
      </OverLayer>
    </Wrapper>
  );
};

export default HomePage;
