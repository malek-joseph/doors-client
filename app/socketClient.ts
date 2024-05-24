import io from 'socket.io-client';

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8000';
const socket = io(API_BASE_URL, {
  path: '/socket.io',
});

export default socket;

