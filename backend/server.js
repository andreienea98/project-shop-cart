const app = require('./app')
const connection = require('./models/db/connection')

const PORT = 3000

app.listen(PORT, async () => {
    try {
        await connection.execute('SELECT 1')
        console.log(`Server is running on port ${PORT}`)
        console.log('MySQL connection OK');

    }
    catch (error) {
        console.error('MySQL connection failed:', error.message);

    }
})
