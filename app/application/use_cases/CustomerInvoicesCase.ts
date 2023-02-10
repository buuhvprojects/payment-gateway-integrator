import UseCase from "app/domain/UseCase";
import InvoicesRepository from "app/infrastructure/repositories/InvoicesRepository";
import { APIReturn } from "../interfaces";

export interface CustomerInvoicesCaseData {
    customerId: string;
}

class CustomerInvoicesCase extends UseCase {
    protected status: boolean;
    protected message?: string;
    protected values?: any;
    constructor(private readonly data: CustomerInvoicesCaseData) {
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
        console.log('Entrou no UserInvoicesCase', 'Buscando faturas');
        const invoices = await InvoicesRepository.findMany({
            customerId: this.data.customerId,
        });
        this.status = true;
        this.values = invoices?.length ? invoices : [];
    }
}
export default CustomerInvoicesCase;
