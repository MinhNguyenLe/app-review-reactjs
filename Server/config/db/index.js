const mongoose = require('mongoose');
//const uri = process.env.MONGODB_URL;
const uri = 'mongodb://localhost:27017/review-school';

async function connect() {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });
        console.log('connect successfully');
    } catch (error) {
        console.log('connect failure');
    }
}

module.exports = { connect };
