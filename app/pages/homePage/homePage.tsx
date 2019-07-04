// @flow
import React from 'react';
// import { Link } from 'react-router-dom';
// import routes from '../constants/routes';
import styled from 'styled-components';
import ImageCard from '../../components/imageCard';
import OverLayer from '../../components/overLayer';
import ImagePreview from '../../components/imagePreview';
import { useAppContext } from '../../store/appContext';
import { AppState } from '../../store/appStore';
import { getFolderFiles } from '../../utils';

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
`;

const ImageStance = styled('i')`
  width: 200px;
`;

const HomePage = () => {
  const [isLayerOpen, setLayerOpen] = React.useState<boolean>(false);
  const [selectedImg, setSelectedImg] = React.useState<string>('');
  const { state: app } = useAppContext() as { state: AppState };
  const { images } = getFolderFiles(app.selectedFolder.path);

  return (
    <Wrapper className="wrapper">
      <Gallery className="gallery">
        <h2>{app.selectedFolder.name || 'welcome!'}</h2>
        <ImagesContainer>
          {images.map(image => (
            <ImageCard
              {...{ setSelectedImg, setLayerOpen }}
              key={image}
              url={image}
              height="30vh"
            />
          ))}
          {[1, 2, 3, 4, 5].map(val => (
            <ImageStance key={val} />
          ))}
        </ImagesContainer>
      </Gallery>
      <OverLayer isOpen={isLayerOpen}>
        <ImagePreview url={selectedImg} {...{ setLayerOpen }} />
      </OverLayer>
    </Wrapper>
  );
};

export default HomePage;
