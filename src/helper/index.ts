export const checkImageType = (ext: string) => {
  switch (ext) {
    case ".gif":
    case ".jpg":
    case ".png":
    case "jpeg":
    case "jfif":
      return true;
    default:
      return false
  }
}