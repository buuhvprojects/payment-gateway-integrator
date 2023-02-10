import UseCase from "app/domain/UseCase";
import { InvoiceStatus } from "app/infrastructure/orm/mongoose/schemas/Invoices";
import InvoicesRepository from "app/infrastructure/repositories/InvoicesRepository";
import { APIReturn } from "../interfaces";

export interface PaidInvoiceCaseData {
    invoiceId: string;
}

class PaidInvoiceCase extends UseCase {
    protected status: boolean;
    protected message?: string;
    protected values?: any;
    constructor(private readonly data: PaidInvoiceCaseData) {
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
    async init(): Promise<void> {
        console.log('Entrou no PaidInvoiceCase');
        const invoiceStatus: InvoiceStatus[] = ['EXPIRED', 'PENDING'];
        console.log('Marcando fatura como paga!');
        const response = await InvoicesRepository.findAndUpdate({
            id: this.data.invoiceId,
            status: {
                $in: invoiceStatus
            }
        }, {
            status: 'PAID'
        });
        this.status = response ? true : false;
        if (this.status === false) {
            this.message = 'Essa fatura já foi paga ou está cancelada';
            return;
        }
    }
}
export default PaidInvoiceCase;
