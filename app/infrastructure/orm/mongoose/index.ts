import config from 'app/common/config';
import mongoose from 'mongoose';

let authSource = {
    authSource: 'admin',
    auth: {
        password: config.mongo.PASSWORD,
        username: config.mongo.USERNAME
    }
}
if (config.mongo.AUTH_ENABLED === false) {
    (authSource as any) = {};
}

mongoose.connect(`mongodb://${config.mongo.HOST}:${config.mongo.PORT}/${config.mongo.DATABASE}`, authSource);
const connection = mongoose.connection;

connection.once("open", function () {
    console.log("MongoDB database connection established successfully");
});
export default connection;
