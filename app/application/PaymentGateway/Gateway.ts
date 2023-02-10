export interface GatewayNewInvoiceData {
    /**
     * Tipo de fatura
     */
    billingType: 'BOLETO' | 'CREDIT_CARD';
    /**
     * ID do cliente
     */
    customerId: string;
    /**
     * Data de vencimento
     * @example yyyy-mm-dd
     */
    dueDate: string;
    /**
     * Descrição da fatura
     */
    description: string;
    /**
     * ID da fatura externa
     */
    externalInvoiceId: string;
    /**
     * Valor da fatura em centavos
     */
    amount: number;
    /**
     * Valor da multa cobrada após o vencimento
     */
    fine: number;
    /**
     * Juros em porcentagem cobrado após o vencimento
     */
    interest: number;
}

abstract class Gateway {
    abstract cancelInvoice(invoiceId: string): Promise<boolean>;
    abstract createInvoice(data: GatewayNewInvoiceData): Promise<string|null>;
    abstract getBarCode(data: Record<string, unknown>): Promise<string|null>;
}
export default Gateway;
