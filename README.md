# Интернет-магазин

Полноценный интернет-магазин с корзиной, оформлением заказов.

## Функционал
 Просмотр каталога товаров
 Корзина с добавлением/удалением
 Оформление заказа (имя, телефон, адрес)
 Заказы сохраняются в базу данных

## Технологии
 **Frontend**: React, React Router, Axios
 **Backend**: Node.js, Express
 **Database**: MongoDB (MongoDB Atlas)
 **Стили**: CSS

## Запуск проекта

1. Клонировать репозиторий:  
   `git clone https://github.com/Space77user/my-shop.git`

2. Установить зависимости бэкенда:  
   `npm install`

3. Установить зависимости фронтенда:  
   `cd shop && npm install`

4. Создать файл `.env` с переменной:  
   `MONGODB_URL=mongodb+srv://user:pass@cluster.mongodb.net/shop`

5. Заполнить базу тестовыми товарами:  
   `node seed.js`

6. Запустить бэкенд:  
   `node server.js`

7. Запустить фронтенд:  
   `cd shop && npm run dev`