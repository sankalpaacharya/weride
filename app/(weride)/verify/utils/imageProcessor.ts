import imageCompression from "browser-image-compression"

export async function image_compress_webp(file: File) {
  if (file) {
    try {
      const compressedFile = await compressImage(file);
      const webpFile = await convertToWebP(compressedFile);
      return webpFile;
    } catch (error) {
      console.error("❌ Error processing image:", error);
    }
  } else {
    console.log("No file found");
  }
}

async function compressImage(file: File) {
  const options = {
    maxSizeMB: 0.19, // ~190KB (under 200KB limit)
    maxWidthOrHeight: 1024, // Resize to max 1024px
    useWebWorker: true,
  };

  try {
    console.log("📉 Compressing image...");
    return await imageCompression(file, options);
  } catch (error) {
    console.error("❌ Compression failed:", error);
    throw error;
  }
}

async function convertToWebP(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      if (event.target) {
        img.src = event.target.result as string;
      } else {
        reject("File reading failed");
        return;
      }
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          reject("Canvas not supported");
          return;
        }

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(new File([blob], `${file.name.split(".")[0]}.webp`, { type: "image/webp" }));
            } else {
              reject("Conversion to WebP failed");
            }
          },
          "image/webp",
          0.9
        );
      };
    };

    reader.onerror = () => reject("File reading failed");
    reader.readAsDataURL(file);
  });
}