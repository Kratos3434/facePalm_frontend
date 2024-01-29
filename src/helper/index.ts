import { baseURL } from "@/env";
import linkifyHtml from 'linkify-html';

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

export const monthToString = (month: number) => {
  switch (month) {
      case 0:
          return "January"
      case 1:
          return "February"
      case 2:
          return "March"
      case 3:
          return "April"
      case 4:
          return "May"
      case 5:
          return "June"
      case 6:
          return "July"
      case 7:
          return "August"
      case 8:
          return "September"
      case 9:
          return "October"
      case 10:
          return "November"
      case 11:
          return "December"
  }
}

export const generateDate = (createdAt: string) => {
  const created = new Date(createdAt);

  return `${monthToString(created.getMonth())} ${created.getDate()}, ${created.getFullYear()}`
}

export const linkifyDescrip = (text: string) => {
  return { __html: linkifyHtml(text, { defaultProtocol: 'https', target: '_blank' }) }
}