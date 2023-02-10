import UseCase from "app/domain/UseCase";
import InvoicesRepository from "app/infrastructure/repositories/InvoicesRepository";
import { APIReturn } from "../interfaces";
import PaymentGateway from "../PaymentGateway";

export interface GetInvoiceCaseData {
    invoiceId: string;
}

class GetInvoiceCase extends UseCase {
    protected status: boolean;
    protected message?: string;
    protected values?: any;
    private gateway = new PaymentGateway('ASAAS').getInstance();
    constructor(private readonly data: GetInvoiceCaseData) {
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
    private async findBarcodeInGateway(gateway: string, externalInvoiceId: string) {
        console.log('Buscando código de barras no gateway', gateway);
        const bardCode = await this.gateway.getBarCode({
            externalInvoiceId,
        });
        return bardCode;
    }
    async init(): Promise<void> {
        console.log('Entrou no GetInvoiceCase');
        console.log('Buscando Fatura');
        const response = await InvoicesRepository.findById(this.data.invoiceId);
        if (!response?._id) {
            this.status = false;
            this.message = 'Fatura não encontrada';
            return;
        }
        console.log('Verificando se possui código de barras')
        const barCode = await this.findBarcodeInGateway(response.gateway, response.externalInvoiceId);
        this.status = true;
        this.values = {
            ...response,
            barCode,
        }
    }
}
export default GetInvoiceCase;
