const mongoose = require('mongoose');
const Product = require('./models/Product');

require('dotenv').config();


const products = [
    {
        name: "Классическая футболка",          
        price: 1990,                              
        description: "Хлопок 100%, доступны все размеры от XS до XXL", 
        category: "Одежда",                       
        imageUrl: "/shirt.jpg"
    },
    {
        name: "Кроссовки Nike Air",
        price: 8990,
        description: "Оригинальные кроссовки с технологией Air. Размеры 40-45.",
        category: "Обувь",
        imageUrl: "/shoes.jpg"
    },
    {
        name: "Шорты Slim Fit",
        price: 3490,
        description: "Узкие джинсы темно-синего цвета. Эластичные, хорошо сидят.",
        category: "Одежда",
        imageUrl: "/shorts.jpg"
    },
    {
        name: "Рюкзак городской",
        price: 2990,
        description: "Водонепроницаемый, есть отдел для ноутбука 15 дюймов.",
        category: "Аксессуары",
        imageUrl: "/bag.jpeg"
    },
    {
        name: "Часы наручные",
        price: 4990,
        description: "Стильные часы, хронограф, водозащита до 50 метров.",
        category: "Аксессуары",
        imageUrl: "/watch.jpg"
    }
];


async function seedDatabase() {
    try {
        console.log('Подключаюсь к MongoDB...');
        
        await mongoose.connect(process.env.MONGODB_URL);
        
        console.log('Подключено к MongoDB');
        console.log('База данных:', mongoose.connection.name); 

        console.log('Очищаю старые товары...');
        
        await Product.deleteMany({});
        
        console.log('Старые товары удалены');

        console.log('Добавляю тестовые товары...');
        
        const result = await Product.insertMany(products);
        
        console.log(`Успешно добавлено ${result.length} товаров:`);

        result.forEach((product, index) => {
            console.log(`   ${index + 1}. ${product.name} — ${product.price} ₽`);
        });

        console.log('\n Для проверки одного товара используй ID:');
        console.log(`   http://localhost:5000/api/products/${result[0]._id}`);

    } catch (error) {

        console.log('Ошибка при заполнении базы:');
        console.log(error.message);
        
    } finally {
        await mongoose.connection.close();
        console.log('Соединение с базой закрыто');
    }
}


seedDatabase();