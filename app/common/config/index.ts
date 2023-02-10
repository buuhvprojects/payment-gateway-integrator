import app from "./app.config";
import mongo from "./mongo.config";

interface configInterface {
    app: typeof app;
    mongo: typeof mongo
}

const config: configInterface = {
    app,
    mongo,
};
export default config;
