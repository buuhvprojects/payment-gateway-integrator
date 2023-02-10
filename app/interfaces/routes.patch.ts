import TokenManager from 'app/common/TokenManager';
import * as express from 'express';
import InvoicesController from './controllers/InvoicesController';
const routes = express.Router();

routes.patch(
    '/v1/invoice/:invoiceId/paid',
    TokenManager.checkSession,
    TokenManager.role(['admin', 'gestor']).validate,
    async (req, res) => {
        try {
            return new InvoicesController(req, res).paidInvoice();
        }
        catch (error) {
            return res.status(503).json({
                status: false,
                message: error.message || error
            });
        }
    });

const patchRoutes = routes;
export default patchRoutes;
