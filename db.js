import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.Promise = global.Promise;

mongoose.connect(
    " mongodb://iad2-c11-2.mongo.objectrocket.com:52366,iad2-c11-1.mongo.objectrocket.com:52366,iad2-c11-0.mongo.objectrocket.com:52366/?replicaSet=4f1",
    {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }

    
)
const db = mongoose.connection;

const handleOpen = () => console.log("Connected to DB");

const handleError = error => console.log("Error on DB Connection:${error}");

db.once("open", handleOpen);

db.on("error", handleError);

