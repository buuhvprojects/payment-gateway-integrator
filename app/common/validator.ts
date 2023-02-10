import { Validator } from 'node-input-validator';
import translate from '../translate';

/**
 * Valida os campos de requisição
 * @param {*} context 
 * @param {*} constraints 
 * @param {*} lang
 * @returns object
 */
async function campsValidator(context: any = {}, constraints: any = {}, lang: any = 'pt-br'): Promise<typeof constraints> {
    try {
        const validator = new Validator(context, constraints);
        const doValidation = await validator.check();
        if (!doValidation) {
            return {
                status: false,
                message: translate('invalid_fields', lang.toLowerCase())
            }
        }
        const newContext = {};
        for (let key in constraints) {
            if (key.indexOf('.') > 0)
                key = key.substring(0, key.indexOf('.'));
            if (key in newContext)
                continue;
            newContext[key] = context[key];
        }
        return JSON.parse(JSON.stringify(newContext));
    }
    catch (error) {
        return {
            status: false,
            message: error.message
        };
    }
}
export default campsValidator;
