import UseCase from "app/domain/UseCase";
import InvoicesRepository from "app/infrastructure/repositories/InvoicesRepository";
import { APIReturn } from "../interfaces";
import { InvoiceInterface } from 'app/infrastructure/orm/mongoose/schemas/Invoices';
import GenerateInvoiceDomain, { GenerateInvoiceData } from "app/domain/GenerateInvoiceDomain";

class GenerateInvoiceCase extends UseCase {
    protected status: boolean;
    protected message?: string;
    protected values?: any;
    constructor(private readonly data: GenerateInvoiceData) {
        super();
    }
    get result(): APIReturn {
        console.log('Finalizado!');
        return {
            status: this.status,
            message: this.message,
            values: this.values
        }
    }
    private validateLastInvoice(_invoice: InvoiceInterface) {
        console.log('Validando fatura');
        if (!_invoice) return true;
        const invoiceYear = new Date(_invoice.createdAt).getFullYear();
        const currentYear = new Date().getFullYear();
        const isNotSameYear = invoiceYear !== currentYear;
        if (isNotSameYear) return true;

        const invoiceMonth = new Date(_invoice.createdAt).getMonth();
        const currentMonth = new Date().getMonth();
        const isSameMonth = currentMonth === invoiceMonth;
        if (isSameMonth) return false;
        
        const isPaid = _invoice.status === 'PAID';

        return isPaid;
    }
    private async setExternalId(externalInvoiceId: string, invoiceId: string) {
        const response = await InvoicesRepository.updateById(invoiceId, {
            externalInvoiceId
        });
        if (response) {
            console.log('ID do gateway externo salvo com sucesso!');
        } else {
            console.log('Não foi possível salvar o ID do gateway externo!');
        }
    }
    private async registerInvoiceInGateway(domain: GenerateInvoiceDomain, newInvoice: InvoiceInterface, invoiceId: string) {
        console.log('Registrando fatura no Gateway', newInvoice.gateway);
        const externalInvoiceId = await domain.generateInvoiceInGateway({
            amount: newInvoice.amount,
            invoiceId,
            customerId: newInvoice.customerId,
        });

        if (externalInvoiceId) {
            await this.setExternalId(externalInvoiceId, invoiceId);
        }
    }
    async init(): Promise<void> {
        console.log('Iniciou o GenerateInvoiceCase', 'Buscando última fatura');
        const lastInvoice = await InvoicesRepository.findLastInvoice({
            customerId: this.data.customerId,
            status: {
                $ne: 'CANCELED'
            },
            invoiceType: this.data.invoiceType
        });
        const canItGenerateInvoice = this.validateLastInvoice(lastInvoice);
        console.log('Fatura validada');
        if (!canItGenerateInvoice) {
            this.status = false;
            this.message = 'Fatura já existe';
            return;
        }
        const domain = new GenerateInvoiceDomain(this.data);
        const newInvoice = await domain.generateNewInvoice();

        const invoiceId = await InvoicesRepository.insert(newInvoice);
        if (!invoiceId) {
            this.status = false;
            this.message = 'Falha ao gerar fatura';
            return;
        }

        await this.registerInvoiceInGateway(domain, newInvoice, invoiceId);

        this.status = true;
        this.values = invoiceId
    }

}
export default GenerateInvoiceCase;
