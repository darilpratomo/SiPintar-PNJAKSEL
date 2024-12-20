const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors'); // Tambahkan CORS

const app = express();
const server = http.createServer(app);

// Mengaktifkan CORS
app.use(cors({
  origin: 'https://si-pintar-pnjaksel-front-end.vercel.app', // Ubah dengan domain frontend Anda
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

const io = new Server(server, {
  cors: {
    origin: 'https://si-pintar-pnjaksel-front-end.vercel.app', // Ubah dengan domain frontend Anda
    methods: ['GET', 'POST'],
  }
});

app.use(express.static('public')); // Folder untuk frontend jika ingin digabung

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('chat message', (data) => {
    io.emit('chat message', data); // Broadcast pesan ke semua client
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
