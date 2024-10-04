const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());

app.use(cors());

// Connect to MongoDB
const connectDb = async (callback) => {
    try {

        await mongoose.connect('mongodb+srv://rohitrajrouth:2vDUERouxtYhCt6w@cluster0.bvmqxb7.mongodb.net/Expenses');
        console.log(`Server Running On ${mongoose.connection.host}`)
        callback();
    } catch (error) {
        console.log(error);
    }
}

const citySchema = new mongoose.Schema({
    cityName: String,
    placesToVisit: [String],
    seasonToGo: String,
    budgetPlans: String, // This can include price ranges
    dressCode: String,
    bestHotels: [String],
});
const City = mongoose.model('cities', citySchema);

app.post('/ask', async (req, res) => {
    const cityName = req.body.city; // Assuming the user sends the city name in the body
    console.log(`User: ${cityName}`);
    try {
        const cityData = await City.findOne({ cityName: cityName });
        if (!cityData) {
            return res.status(404).json({ error: 'City not found' });
        }
        res.json(cityData);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error fetching data from the database' });
    }
});
connectDb(() => {
    app.listen(port, () => {
    console.log('Server is running at',port)
})
});
