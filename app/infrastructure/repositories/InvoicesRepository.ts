import config from 'app/common/config';
import InvoicesRepositoryDomain from 'app/domain/InvoicesRepositoryDomain';
import { InvoiceInterface, InvoicesModel } from 'app/infrastructure/orm/mongoose/schemas/Invoices';
import connection from '../orm/mongoose';

class InvoicesRepository extends InvoicesRepositoryDomain {
    constructor() {
        super();
        connection.useDb(config.mongo.DATABASE);
    }
    async findById(_invoiceId: string, _fields?: Record<string, unknown>) {
        const response = await InvoicesModel.findById(_invoiceId, _fields);
        const invoice = {
            ...response.toObject(),
        }
        if ((invoice as unknown as any)?.__v !== undefined) {
            delete (invoice as unknown as any).__v;
        }
        return invoice;
    }
    async updateById(_invoiceId: string, _fields?: Record<string, unknown>) {
        const response = await InvoicesModel.findByIdAndUpdate(_invoiceId, _fields);
        return response;
    }
    async findAndUpdate(_where?: Record<string, unknown>, _fields?: Record<string, unknown>) {
        if (_where.hasOwnProperty('id')) {
            _where._id = _where.id;
            delete _where.id;
        }
        const response = await InvoicesModel.findOneAndUpdate(_where, _fields);
        return response;
    }
    async insert(_data: InvoiceInterface): Promise<string|null> {
        try {
            const response = await InvoicesModel.create(_data);
            return response?.id;
        } catch (_error) {
            return;
        }
    }
    async findLastInvoice(_where?: Record<string, unknown>, _fields?: Record<string, unknown>) {
        try {
            const response = await InvoicesModel.findOne(_where || {}, _fields || {}, {
                sort: {
                    createdAt: -1
                }
            });
            return response.toObject();
        } catch (_error) {
            return;
        }
    }
    async findOne(_where?: Record<string, unknown>, _fields?: Record<string, unknown>) {
        const response = await InvoicesModel.findOne(_where || {}, _fields || {}, {
            sort: {
                createdAt: -1
            }
        });
        return response
    }
    async findMany(_where?: Record<string, unknown>, _fields?: Record<string, unknown>) {
        const response = await InvoicesModel.find(_where || {}, _fields || {}, {
            sort: {
                createdAt: -1
            }
        }).limit(10);
        return response;
    }
}
export default new InvoicesRepository();