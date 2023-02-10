import PaymentGateway from "app/application/PaymentGateway";
import { InvoiceInterface } from "app/infrastructure/orm/mongoose/schemas/Invoices";
import moment from "moment";

interface NewInvoiceDueDate {
    days: number;
    months: number;
    years: number;
}

export interface GenerateInvoiceData {
    amount: 0;
    dueDate: NewInvoiceDueDate;
    customerId: string;
    description: string;
    invoiceType: string;
}

class GenerateInvoiceDomain {
    private readonly gateway = new PaymentGateway('ASAAS').getInstance();
    constructor(private readonly data: GenerateInvoiceData) {}
    private getDueDate(): Date {
        if (this.data.dueDate.years) {
            return moment().add(this.data.dueDate.years, 'years').toDate();
        } else if (this.data.dueDate.months) {
            return moment().add(this.data.dueDate.months, 'months').toDate();
        } else if (this.data.dueDate.days) {
            return moment().add(this.data.dueDate.days, 'days').toDate();
        }
        return moment().add(1, 'days').toDate();
    }
    public async generateNewInvoice() {
        console.log('Gerando estrutura da nova fatura');
        const data: InvoiceInterface = {
            createdAt: null,
            dueDate: this.getDueDate(),
            amount: this.data.amount,
            status: 'PENDING',
            fine: 1,
            interest: 2,
            externalInvoiceId: null,
            id: null,
            billingType: 'BOLETO',
            customerId: this.data.customerId,
            gateway: 'ASAAS',
            invoiceType: this.data.invoiceType,
        };
        delete data.createdAt;
        delete data._id;
        delete data.id;
        delete data.externalInvoiceId;

        console.log('Estrutura gerada');
        return data;
    }
    public async generateInvoiceInGateway(data: {
        invoiceId: string;
        amount: number;
        customerId: string
    }): Promise<string|null> {
        console.log('Gerando fatura na Asaas');
        const gatewayInvoiceId = await this.gateway.createInvoice({
            billingType: 'BOLETO',
            customerId: data.customerId,
            dueDate: moment(this.getDueDate()).format('YYYY-MM-DD'),
            externalInvoiceId: data.invoiceId,
            fine: 1,
            interest: 2,
            amount: data.amount,
            description: this.data.description,
        });
        if (gatewayInvoiceId) {
            console.log('Fatura gerada');
            return gatewayInvoiceId;
        }
        console.log('Falha ao gerar fatura');
        return;
    }
}
export default GenerateInvoiceDomain;
