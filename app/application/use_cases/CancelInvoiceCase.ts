import UseCase from "app/domain/UseCase";
import InvoicesRepository from "app/infrastructure/repositories/InvoicesRepository";
import { APIReturn } from "../interfaces";
import PaymentGateway from "../PaymentGateway";

export interface CancelInvoiceCaseData {
    invoiceId: string;
}

class CancelInvoiceCase extends UseCase {
    protected status: boolean;
    protected message?: string;
    protected values?: any;
    private gateway = new PaymentGateway('ASAAS').getInstance();
    constructor(private readonly data: CancelInvoiceCaseData) {
        super();
    }
    get result(): APIReturn {
        console.log('Finalizado');
        return {
            status: this.status,
            values: this.values,
            message: this.message
        }
    }
    private async cancelInGateway(gateway: string, externalInvoiceId: string) {
        console.log('Cancelando fatura no sistema');
        const wasItCanceled = await this.gateway.cancelInvoice(externalInvoiceId);
        console.log('Cancelando fatura no Gateway', gateway);
        if (!wasItCanceled) {
            this.status = false;
            this.message = 'Não foi possível cancelar a fatura.'
            return false;
        }
        return true;
    }
    async init(): Promise<void> {
        console.log('Entrou no CancelInvoiceCase');
        const { externalInvoiceId, gateway } = await InvoicesRepository.findById(this.data.invoiceId);

        const cancelInGateway = await this.cancelInGateway(gateway, externalInvoiceId);
        if (!cancelInGateway) return;
        
        const response = await InvoicesRepository.findAndUpdate({
            id: this.data.invoiceId,
            status: 'PENDING'
        }, {
            status: 'CANCELED'
        });
        this.status = response ? true : false;
        if (this.status === false) {
            this.message = 'Essa fatura já foi cancelada ou está paga';
        }
    }
}
export default CancelInvoiceCase;
