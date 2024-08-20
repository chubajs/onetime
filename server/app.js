const express = require('express');
const { createCanvas } = require('canvas');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

let currentBitmap = Array(50).fill().map(() => Array(50).fill('#FFFFFF'));

app.post('/updateBitmap', (req, res) => {
  currentBitmap = req.body.bitmap;
  res.json({ success: true });
});

function generateImage() {
  const canvas = createCanvas(500, 500);
  const ctx = canvas.getContext('2d');

  currentBitmap.forEach((row, y) => {
    row.forEach((color, x) => {
      ctx.fillStyle = color;
      ctx.fillRect(x * 10, y * 10, 10, 10);
    });
  });

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync('public/current_emoji.png', buffer);
}

setInterval(generateImage, 10000); // Generate image every 10 seconds

app.get('/current_emoji.png', (req, res) => {
  res.sendFile(__dirname + '/public/current_emoji.png');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});