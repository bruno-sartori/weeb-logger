const fs = require('fs').promises;
const path = require('path');

const convertImageToBase64 = async (name, src) => {
  console.log(name, src);
  const data = await fs.readFile(src);
  const base64Image = Buffer.from(data, 'binary').toString('base64');
  return { [name]: base64Image };
}

const generateBase64Assets = async () => {
  const waifuPath = './docs/waifus'
  try {
    const filenames = await fs.readdir(waifuPath);
    
    const promises = filenames.map(async (fileName) => {
      const asset = await convertImageToBase64(fileName.split('_')[0], path.join(waifuPath, fileName));
      return asset;
    });

    let base64Assets = await Promise.all(promises);
    base64Assets = base64Assets.reduce(((r, c) => Object.assign(r, c)), {});
    
    fs.writeFile('src/waifus.json', JSON.stringify(base64Assets));
  } catch (error) {
    console.error(error);
  }
}

generateBase64Assets();
