import AsaasGateway from "./AsaasGateway";

class PaymentGateway {
    constructor(private readonly gateway: 'ASAAS') {}
    public getInstance() {
        switch (this.gateway) {
            case 'ASAAS':
                return new AsaasGateway();
            default:
                return new AsaasGateway();
        }
    }
}
export default PaymentGateway;
