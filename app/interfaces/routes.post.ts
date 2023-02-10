import TokenManager from 'app/common/TokenManager';
import campsValidator from 'app/common/validator';
import * as express from 'express';
import InvoicesController from './controllers/InvoicesController';
const routes = express.Router();

routes.post(
    '/v1/generate-invoice',
    TokenManager.checkSession,
    TokenManager.role(['admin', 'gestor']).validate,
async (req, res) => {
    try {
        const camps = await campsValidator(req.body, {
            amount: 'required|integer',
            dueDate: 'required|object',
            customerId: 'required|string',
            description: 'required|string',
            invoiceType: 'required|string',
        });
        if (camps.status === false) return res.status(200).json(camps);
        req.body = camps;
        return new InvoicesController(req, res).generateInvoice();
    }
    catch (error) {
        return res.status(503).json({
            status: false,
            message: error.message || error
        });
    }
});

routes.post(
    '/v1/invoice/webhook',
    TokenManager.checkSha256Session,
    async (req, res) => {
        try {
            return new InvoicesController(req, res).webhook();
        }
        catch (error) {
            return res.status(503).json({
                status: false,
                message: error.message || error
            });
        }
    });

const postRoutes = routes;
export default postRoutes;
