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

class InvoicesController {
    constructor(private req: Request, private res: Response) {}
    generateInvoice = async () => {
        try {
            const { body } = this.req;

            const useCase = new GenerateInvoiceCase(body as unknown as GenerateInvoiceData);
            await useCase.init();
            
            return this.res.status(200).json(useCase.result);
        } catch(error) {
            return this.res.status(422).json({
                status: false,
                message: error.message
            });
        }
    }
    cancelInvoice = async () => {
        try {
            const { params } = this.req;

            const useCase = new CancelInvoiceCase(params as unknown as CancelInvoiceCaseData);
            await useCase.init();
            
            return this.res.status(200).json(useCase.result);
        } catch(error) {
            return this.res.status(422).json({
                status: false,
                message: error.message
            });
        }
    }
    paidInvoice = async () => {
        try {
            const { params } = this.req;

            const useCase = new PaidInvoiceCase(params as unknown as PaidInvoiceCaseData);
            await useCase.init();
            
            return this.res.status(200).json(useCase.result);
        } catch(error) {
            return this.res.status(422).json({
                status: false,
                message: error.message
            });
        }
    }
    getInvoice = async () => {
        try {
            const { params } = this.req;

            const useCase = new GetInvoiceCase(params as unknown as GetInvoiceCaseData);
            await useCase.init();
            
            return this.res.status(200).json(useCase.result);
        } catch(error) {
            return this.res.status(422).json({
                status: false,
                message: error.message
            });
        }
    }
    webhook = async () => {
        try {
            const { body } = this.req;

            const useCase = new InvoiceWebhookCase(body as unknown as IAsaas.WebhookInvoice);
            await useCase.init();
            
            return this.res.status(200).json(useCase.result);
        } catch(error) {
            return this.res.status(422).json({
                status: false,
                message: error.message
            });
        }
    }
    getCustomerInvoices = async () => {
        try {
            const { query } = this.req;

            const useCase = new CustomerInvoicesCase(query as unknown as CustomerInvoicesCaseData);
            await useCase.init();
            
            return this.res.status(200).json(useCase.result);
        } catch(error) {
            return this.res.status(422).json({
                status: false,
                message: error.message
            });
        }
    }
}
export default InvoicesController;
