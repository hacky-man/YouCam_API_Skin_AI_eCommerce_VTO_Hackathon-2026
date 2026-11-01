const MAX_EDGE_PX = 1024;
const JPEG_QUALITY = 0.9;

export async function prepareImageForUpload(source: Blob): Promise<string> {
  const objectUrl = URL.createObjectURL(source);

  try {
    const image = await loadImage(objectUrl);
    const scale = Math.min(1, MAX_EDGE_PX / Math.max(image.naturalWidth, image.naturalHeight));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(image.naturalWidth * scale);
    canvas.height = Math.round(image.naturalHeight * scale);

    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Your browser could not process this image.');
    }

    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/jpeg', JPEG_QUALITY);
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('That file could not be read as an image.'));
    image.src = src;
  });
}
