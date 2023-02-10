namespace IAsaas {
	export type BillingType = 'BOLETO' | 'CREDIT_CARD' | 'PIX';
	export interface CreateInvoice {
		customer: string
		billingType: BillingType;
		dueDate: string
		value: number
		description?: string
		/**
		 * Identificador do sistema dentro do asaas.
		 * Pode ser enviado o id gerado pelo serviço que chama a api da asaas
		 */
		externalReference: string
		discount?: {
			value: number
			dueDateLimitDays: number
		}
		/**
		 * Valor da multa cobrada após o vencimento
		 */
		fine: {
			value: number
		}
		/**
		 * Juros em porcentagem cobrado após o vencimento
		 */
		interest: {
			value: number
		}
		postalService?: boolean
	}
	export interface Return<T> {
		status: boolean;
		message?: string;
		values?: T
	}
	export interface CreateInvoiceResponse {
		object: string
		id: string
		dateCreated: string
		customer: string
		paymentLink: any
		dueDate: string
		value: number
		netValue: number
		billingType: string
		canBePaidAfterDueDate: boolean
		pixTransaction: any
		status: string
		description: string
		externalReference: string
		originalValue: any
		interestValue: any
		originalDueDate: string
		paymentDate: any
		clientPaymentDate: any
		installmentNumber: any
		transactionReceiptUrl: any
		nossoNumero: string
		invoiceUrl: string
		bankSlipUrl: string
		invoiceNumber: string
		discount: {
			value: number
			dueDateLimitDays: number
		}
		fine: {
			value: number
		}
		interest: {
			value: number
		}
		deleted: boolean
		postalService: boolean
		anticipated: boolean
		refunds: any
	}
	export interface CancelInvoiceResponse {
		deleted: boolean;
		id: string;
	}
	export interface Invoice {
		object: string
		id: string
		dateCreated: string
		customer: string
		paymentLink: any
		dueDate: string
		value: number
		netValue: number
		billingType: string
		canBePaidAfterDueDate: boolean
		pixTransaction: any
		status: string
		description: string
		externalReference: string
		originalValue: any
		interestValue: any
		originalDueDate: string
		paymentDate: any
		clientPaymentDate: any
		installmentNumber: any
		transactionReceiptUrl: any
		nossoNumero: string
		invoiceUrl: string
		bankSlipUrl: string
		invoiceNumber: string
		discount: {
			value: number
			dueDateLimitDays: number
		}
		fine: {
			value: number
		}
		interest: {
			value: number
		}
		deleted: boolean
		postalService: boolean
		anticipated: boolean
		refunds: any
	}
	export type WebhookInvoiceType = 'PAYMENT_CREATED' | 'PAYMENT_UPDATED' | 'PAYMENT_CONFIRMED' | 'PAYMENT_RECEIVED' | 'PAYMENT_OVERDUE' | 'PAYMENT_DELETED' | 'PAYMENT_RESTORED' | 'PAYMENT_REFUNDED' | 'PAYMENT_RECEIVED_IN_CASH_UNDONE' | 'PAYMENT_CHARGEBACK_REQUESTED' | 'PAYMENT_CHARGEBACK_DISPUTE' | 'PAYMENT_AWAITING_CHARGEBACK_REVERSAL' | 'PAYMENT_DUNNING_RECEIVED' | 'PAYMENT_DUNNING_REQUESTED' | 'PAYMENT_BANK_SLIP_VIEWED' | 'PAYMENT_CHECKOUT_VIEWED';
	export interface WebhookInvoice {
		event: WebhookInvoiceType
		payment: WebhookInvoicePayment
	}

	export interface WebhookInvoicePayment {
		object: string
		id: string
		dateCreated: string
		customer: string
		subscription: string
		installment: string
		paymentLink: string
		originalDueDate: string
		value: number
		netValue: number
		originalValue: any
		interestValue: any
		description: string
		externalReference: string
		billingType: BillingType
		status: string
		pixTransaction: any
		confirmedDate: string
		paymentDate: string
		clientPaymentDate: string
		installmentNumber: any
		creditDate: string
		estimatedCreditDate: string
		invoiceUrl: string
		bankSlipUrl: any
		transactionReceiptUrl: string
		invoiceNumber: string
		deleted: boolean
		anticipated: boolean
		lastInvoiceViewedDate: string
		lastBankSlipViewedDate: any
		postalService: boolean
		creditCard: CreditCard
		discount: Discount
		fine: Fine
		interest: Interest
		split: Split[]
		chargeback: Chargeback
		refunds: any
	}

	export interface CreditCard {
		creditCardNumber: string
		creditCardBrand: string
		creditCardToken: string
	}

	export interface Discount {
		value: number
		dueDateLimitDays: number
		type: string
	}

	export interface Fine {
		value: number
		type: string
	}

	export interface Interest {
		value: number
		type: string
	}

	export interface Split {
		walletId: string
		fixedValue?: number
		percentualValue?: number
	}

	export interface Chargeback {
		status: string
		reason: string
	}

	export interface BarCodeResponse {
		identificationField: string
		nossoNumero: string
		barCode: string
	}

}
export default IAsaas;
