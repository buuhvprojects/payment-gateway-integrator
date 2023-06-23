import { Response } from "app/application/interfaces";
import IAsaas from "app/application/services/AsassInterfaces";
import CancelInvoiceCase, { CancelInvoiceCaseData } from "app/application/use_cases/CancelInvoiceCase";
import CustomerInvoicesCase, { CustomerInvoicesCaseData } from "app/application/use_cases/CustomerInvoicesCase";
import GenerateInvoiceCase from "app/application/use_cases/GenerateInvoiceCase";
import GetInvoiceCase, { GetInvoiceCaseData } from "app/application/use_cases/GetInvoiceCase";
import PaidInvoiceCase, { PaidInvoiceCaseData } from "app/application/use_cases/PaidInvoiceCase";
import InvoiceWebhookCase from "app/application/use_cases/Webhooks/AsaasInvoiceWebhookCase";
import { GenerateInvoiceData } from "app/domain/GenerateInvoiceDomain";
import { Request } from "express";
import Controller from "./Controller";

class InvoicesController extends Controller {
    constructor(req: Request, res: Response) {
        super(req, res);
    }
    generateInvoice = async () => {
        return this.execute(new GenerateInvoiceCase(this.req.body as unknown as GenerateInvoiceData));
    }
    cancelInvoice = async () => {
        return this.execute(new CancelInvoiceCase(this.req.params as unknown as CancelInvoiceCaseData))
    }
    paidInvoice = async () => {
        return this.execute(new PaidInvoiceCase(this.req.params as unknown as PaidInvoiceCaseData))
    }
    getInvoice = async () => {
        this.execute(new GetInvoiceCase(this.req.params as unknown as GetInvoiceCaseData))
    }
    webhook = async () => {
        return this.execute(new InvoiceWebhookCase(this.req.body as unknown as IAsaas.WebhookInvoice));
    }
    getCustomerInvoices = async () => {
        this.execute(new CustomerInvoicesCase(this.req.query as unknown as CustomerInvoicesCaseData));
    }
}
export default InvoicesController;
