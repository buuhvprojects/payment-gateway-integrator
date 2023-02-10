import { InvoiceInterface } from "app/infrastructure/orm/mongoose/schemas/Invoices";

abstract class InvoicesRepositoryDomain {
    abstract findLastInvoice(_where?: Record<string, unknown>, _fields?: Record<string, unknown>): Promise<unknown>;
    abstract findAndUpdate(_where?: Record<string, unknown>, _fields?: Record<string, unknown>): Promise<unknown>;
    abstract findById(_invoiceId: string, _fields?: Record<string, unknown>): Promise<unknown>;
    abstract insert(_data: InvoiceInterface): Promise<unknown>;
    abstract updateById(_invoiceId: string, _fields?: Record<string, unknown>): Promise<unknown>;
    abstract findOne(_where?: Record<string, unknown>, _fields?: Record<string, unknown>): Promise<unknown>;
    abstract findMany(_where?: Record<string, unknown>, _fields?: Record<string, unknown>): Promise<unknown>;
}
export default InvoicesRepositoryDomain;
