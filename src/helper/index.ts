import { baseURL } from "@/env";

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

export const authenticate = async (token?: string): Promise<boolean> => {
  const res = await fetch(`${baseURL}/admin/user/authenticate`, {
      method: 'GET',
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
      },
      cache: 'no-store'
  });
  const data = await res.json();
  
  return data.status;
}