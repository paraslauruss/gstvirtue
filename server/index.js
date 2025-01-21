const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://paras:2XXDQx0UgbALEadK@cluster0.6kv1x.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");

        // Access a database
        const database = client.db("test"); // Replace "test" with your database name
        const collection = database.collection("example"); // Replace with your collection name

        // Example operation
        const documents = await collection.find({}).toArray();
        console.log("Documents:", documents);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    } finally {
        await client.close();
    }
}

run().catch(console.dir);