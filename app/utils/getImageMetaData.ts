const sharp = require('sharp');

const getImageMetaData = async (url: string) => {
  const res = await sharp(url)
    .metadata()
    .then(metadata => {
      return { orientation: metadata.orientation };
    })
    .catch((err, info) => {
      console.log(err, info);
      return {};
    });
  return res;
};

export default getImageMetaData;
