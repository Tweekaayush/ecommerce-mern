const bcrypt = require('bcrypt')

const users = [
    {
        name: 'Admin User',
        email: 'admin@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
        image: 'https://i.pinimg.com/736x/90/63/1e/90631eda78c68d6a919926cd3648140d.jpg'
    },
    {
        name: 'John Doe',
        email: 'john@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
        image: 'https://i.pinimg.com/736x/c1/25/82/c125825f66beaf400a562beb18e116d8.jpg',
    },
    {
        name: 'Jane Doe',
        email: 'jane@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
        image: 'https://i.pinimg.com/736x/c1/25/82/c125825f66beaf400a562beb18e116d8.jpg',
    },
]

module.exports = users