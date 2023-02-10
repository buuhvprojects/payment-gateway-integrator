import Asaas from "../services/Asaas";
import Gateway, { GatewayNewInvoiceData } from "./Gateway";

class AsaasGateway extends Gateway {
    async cancelInvoice(invoiceId: string): Promise<boolean> {
        console.log('Cancelando fatura no Asaas');
        const response = await Asaas.cancelInvoice(invoiceId);
        if (!response.status || response.values.deleted === false) {
            return false;
        }
        return true;
    }
    async createInvoice(data: GatewayNewInvoiceData): Promise<string|null> {
        console.log('Criando fatura no Asaas');
        const response = await Asaas.createInvoice({
            billingType: data.billingType,
            customer: data.customerId,
            dueDate: data.dueDate,
            externalReference: data.externalInvoiceId,
            fine: {
                value: data.fine,
            },
            interest: {
                value: data.interest,
            },
            value: data.amount,
            description: data.description,
            postalService: false,
        });
        if (!response.status || !response.values?.id) {
            console.log('Falha ao criar fatura');
            return null;
        }
        return response.values.id;
    }
    async getBarCode(data: Record<string, unknown>): Promise<string|null> {
        console.log('Buscando código de barras no Asaas');
        const response = await Asaas.getBarCode(data.externalInvoiceId as string);
        if (!response.status || !response.values?.barCode) {
            console.log('Código de barras não encontrado');
            return null;
        }
        return response.values.barCode;
    }
}
export default AsaasGateway;
