import  { io } from 'socket.io-client';

export const socket = io("https://notification-service-nilz.onrender.com", {
  autoConnect: false
})