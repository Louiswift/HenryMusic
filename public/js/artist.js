const singerId = getParameterByName('id');
getSingerDetails(singerId).then(resp => {
    const singerPic = document.querySelector('#singerPic');
    singerPic.src = resp.data.artist.cover;
    let a = document.querySelector('.songTitle');
    setBackgroundFromImage(resp.data.artist.cover,a)
    console.log(resp)
})
getPopularSongsFromSingers(singerId).then(resp => {
    console.log(resp);
})

function setBackgroundFromImage(imagePath,div) {
    const image = new Image();
    image.onload = function() {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      context.drawImage(image, 0, 0);
      const imageData = context.getImageData(0, 0, image.width, image.height);
      const pixels = imageData.data;
      const colorCounts = {};
      for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        const color = `${r},${g},${b}`;
        if (colorCounts[color]) {
          colorCounts[color]++;
        } else {
          colorCounts[color] = 1;
        }
      }
      let maxCount = 0;
      let maxColor = '';
      for (const color in colorCounts) {
        if (colorCounts[color] > maxCount) {
          maxCount = colorCounts[color];
          maxColor = color;
        }
      }
      div.style.backgroundColor = `rgb(${maxColor})`;
    };
    image.src = imagePath;
  }
  