const {
    MONGO_USERNAME: USERNAME,
    MONGO_PASSWORD: PASSWORD,
    MONGO_HOST: HOST,
    MONGO_DATABASE: DATABASE,
    MONGO_PORT: PORT,
    MONGO_AUTH_ENABLED: AUTH_ENABLED
} = process.env;
const mongo = {
    USERNAME,
    PASSWORD,
    HOST,
    DATABASE,
    PORT,
    AUTH_ENABLED: AUTH_ENABLED === 'true'
}
export default mongo;
