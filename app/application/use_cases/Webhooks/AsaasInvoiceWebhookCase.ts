import UseCase from "app/domain/UseCase";
import InvoicesRepository from "app/infrastructure/repositories/InvoicesRepository";
import { APIReturn } from "../../interfaces";
import IAsaas from "../../services/AsassInterfaces";
import PaidInvoiceCase from "../PaidInvoiceCase";

class AsaasInvoiceWebhookCase extends UseCase {
    protected status: boolean;
    protected message?: string;
    protected values?: any;
    constructor(private readonly data: IAsaas.WebhookInvoice) {
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
    get invoiceId(): Promise<string> {
        return InvoicesRepository.findOne({
            asaasInvoiceId: this.data.payment.id
        }).then((resp) => resp.id);
    }
    private paymentConfirmed = async () => {
        const useCase = new PaidInvoiceCase({
            invoiceId: await this.invoiceId
        });
        await useCase.init();
        this.status = useCase.result.status;
        this.message = useCase.result.message;
        this.values = useCase.result.values;
    }
    private paymentDeleted = async () => {
        const response = await InvoicesRepository.findAndUpdate({
            id: await this.invoiceId,
            status: 'PENDING'
        }, {
            status: 'CANCELED'
        });
        this.status = response ? true : false;
        if (this.status === false) {
            this.message = 'Essa fatura já foi cancelada ou está paga';
        }
    }
    private paymentOverdue = async () => {
        const invoiceId = await this.invoiceId;
        const response = await InvoicesRepository.updateById(invoiceId, {
            status: 'EXPIRED'
        })
        if (response) {
            this.status = true;
        } else {
            this.status = false;
        }
    }
    async init(): Promise<void> {
        console.log('Entrou no InvoiceWebhookCase');
        switch (this.data.event) {
            case 'PAYMENT_CONFIRMED':
                await this.paymentConfirmed();
                break;
            case 'PAYMENT_DELETED':
                await this.paymentDeleted();
                break;
            case 'PAYMENT_OVERDUE':
                await this.paymentOverdue();
                break;
            default:
                this.status = false;
                this.message = 'O Status do evento não foi definido'
                break;
        }
    }
}
export default AsaasInvoiceWebhookCase;
