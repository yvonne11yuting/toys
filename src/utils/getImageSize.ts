interface ImageSize {
  width: string;
  height: string;
}

export default function getImageSize(imgSrc: string): Promise<ImageSize> {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.src = imgSrc;

    img.onload = () => {
      const width = img.width;
      const height = img.height;

      resolve({
        width: width.toString(),
        height: height.toString(),
      });
    };

    img.onerror = reject;
  });
}
