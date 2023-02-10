import TokenManager from 'app/common/TokenManager';
import campsValidator from 'app/common/validator';
import * as express from 'express';
import InvoicesController from './controllers/InvoicesController';
const routes = express.Router();

routes.get('/v1/invoice/customer-invoices', TokenManager.role(['admin', 'gestor']).validate, TokenManager.checkSession, async (req, res) => {
    try {
        const camps = await campsValidator(req.query, {
            customerId: 'required|string',
        });
        if (camps.status === false) return res.status(200).json(camps);
        req.query = camps;
        return new InvoicesController(req, res).getCustomerInvoices();
    }
    catch (error) {
        return res.status(503).json({
            status: false,
            message: error.message || error
        });
    }
});
routes.get(
    '/v1/invoice/:invoiceId',
    TokenManager.checkSession,
async (req, res) => {
    try {
        const camps = await campsValidator(req.body, {
            userId: 'required|integer',
        });
        if (camps.status === false) return res.status(200).json(camps);
        req.body = camps;
        return new InvoicesController(req, res).getInvoice();
    }
    catch (error) {
        return res.status(503).json({
            status: false,
            message: error.message || error
        });
    }
});

const getRoutes = routes;
export default getRoutes;
