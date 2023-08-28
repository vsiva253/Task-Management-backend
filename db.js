const mongoose = require("mongoose");

const uri = "mongodb+srv://sivasaireddypamulapati17:siva266@cluster0.ngidzuh.mongodb.net/task_management?retryWrites=true&w=majority"; // Replace with your actual connection string

async function connectToDatabase() {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // Other options as needed
        });
        console.log("Connected to MongoDB Atlas");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}


module.exports = connectToDatabase;
