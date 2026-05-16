const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/products', require('./routes/products'));

app.get('/', (req, res) => {
  res.send('Сервер работает!');
});

console.log('🔄 Подключаюсь к MongoDB...');
mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Успешно подключено к MongoDB!');
    console.log('База данных:', mongoose.connection.name);
  })
  .catch(err => {
    console.log('Ошибка подключения к MongoDB:');
    console.log(err.message);
  });

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
  console.log(` Все товары: http://localhost:${PORT}/api/products`);
});

app.use('/api/orders', require('./routes/orders'));

