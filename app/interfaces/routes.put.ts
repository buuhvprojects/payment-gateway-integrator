import * as express from 'express';
const routes = express.Router();

routes.put('/v1/example', async (req, res) => {
    return res.status(200).json({
        status: true
    });
});

const putRoutes = routes;
export default putRoutes;
