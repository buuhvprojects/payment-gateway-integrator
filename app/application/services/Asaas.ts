import config from 'app/common/config';
import axios from 'axios';
import IAsaas from './AsassInterfaces';

const api = axios.create({
    baseURL: config.app.devMode ? config.app.ASAAS.API_DEV : config.app.ASAAS.API_PROD,
    headers: {
        'Content-Type': 'application/json',
        'access_token': config.app.ASAAS.apiKey
    }
});



class Asaas {
    static createInvoice = async (data: IAsaas.CreateInvoice): Promise<IAsaas.Return<IAsaas.CreateInvoiceResponse>> => {
        try {
            const response = await api.post<IAsaas.CreateInvoiceResponse>('/payments', data);
            return {
                status: true,
                values: response.data
            }
        } catch (error) {
            return {
                status: false,
                message: error instanceof Error ? error.message : 'Failed Request'
            }
        }
    }
    static cancelInvoice = async (invoiceId: string): Promise<IAsaas.Return<IAsaas.CancelInvoiceResponse>> => {
        try {
            const response = await api.delete<IAsaas.CancelInvoiceResponse>(`/payments/${invoiceId}`);
            return {
                status: true,
                values: response.data
            }
        } catch (error) {
            return {
                status: false,
                message: error instanceof Error ? error.message : 'Failed Request'
            }
        }
    }
    static getInvoice = async (invoiceId: string): Promise<IAsaas.Return<IAsaas.Invoice>> => {
        try {
            const response = await api.delete<IAsaas.Invoice>(`/payments/${invoiceId}`);
            return {
                status: true,
                values: response.data
            }
        } catch (error) {
            return {
                status: false,
                message: error instanceof Error ? error.message : 'Failed Request'
            }
        }
    }
    static getBarCode = async (invoiceId: string): Promise<IAsaas.Return<IAsaas.BarCodeResponse>> => {
        try {
            const response = await api.get<IAsaas.BarCodeResponse>(`/payments/${invoiceId}/identificationField`);
            return {
                status: true,
                values: response.data
            }
        } catch (error) {
            return {
                status: false,
                message: error instanceof Error ? error.message : 'Failed Request'
            }
        }
    }
}
export default Asaas;
