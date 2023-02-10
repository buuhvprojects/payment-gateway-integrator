import mongoose = require('mongoose');
const Schema = mongoose.Schema;

export type InvoiceStatus = 'PENDING' | 'PAID' | 'EXPIRED' | 'CANCELED' | 'REFUNDED' | 'REVERSED';
export interface InvoiceInterface {
    id: string,
    _id?: mongoose.Types.ObjectId,
    amount: number,
    dueDate: Date,
    status: InvoiceStatus,
    /**
     * Identificador da fatura no sistema externo
     */
    externalInvoiceId: string;
    /**
     * Valor da multa cobrada após o vencimento
     */
    fine: number;
    /**
     * Valor do juros sobre o vencimento
     * @todo porcentagem iniciando em 0% e indo a 100%
     */
    interest: number;
    billingType: 'BOLETO' | 'CREDIT_CARD';
    customerId: string;
    createdAt: string | Date;
    gateway: 'ASAAS';
    invoiceType: string;
}

const InvoicesSchema = new Schema<InvoiceInterface>({
    amount: {
        type: Number,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    externalInvoiceId: {
        type: String,
    },
    fine: {
        type: Number,
        default: 1,
    },
    interest: {
        type: Number,
        default: 2,
    },
    status: {
        type: String,
        enum : ['PENDING','PAID','EXPIRED', 'CANCELED'],
        default: 'PENDING'
    },
    billingType: {
        type: String,
        enum : ['BOLETO','CREDIT_CARD'],
        default: 'BOLETO'
    },
    customerId: {
        type: String,
        required: true
    },
    invoiceType: {
        type: String,
        required: true
    },
    gateway: {
        type: String,
        enum : ['ASAAS'],
        default: 'ASAAS'
    },
    createdAt: {
        type: Date,
        default: Date
    }
}, { collection: 'Invoices' });

export default InvoicesSchema;
export const InvoicesModel = mongoose.model('Invoices', InvoicesSchema);
