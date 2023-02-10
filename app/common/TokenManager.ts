import JWT from '@buuhv/jwt-js';
import { GlobalUser, Response, UserRole } from 'app/application/interfaces';
import translate from 'app/translate';
import * as express from 'express';

class TokenManager {
    /**
     * Busca os dados do token
     */
    static data = (req: express.Request) => {
        const jwt = new JWT(process.env.SECRET_KEY, process.env.ISS);
        const response = jwt.data(req).data;

        return response;
    }
    /**
     * Verifica se uma sessão é válida
     */
    static checkSession = (req: express.Request, res: Response, next: () => void): Response => {

        const lang = (req.params.lang || 'pt-BR').toLowerCase();

        const jwt = new JWT(process.env.SECRET_KEY, process.env.ISS);
        const response = jwt.checkJWT(req);
        if (!response.status) {
            return res.status(200).json({
                status: false,
                message: translate('invalid_session', lang)
            });
        }

        next();

    }
    /**
     * Verifica se uma sessão é válida via token SHA256
     */
    static checkSha256Session = (req: express.Request, res: Response, next: () => void): Response => {
        const tokenSHA256 = req.headers['asaas-access-token'] as string;

        const lang = (req.params.lang || 'pt-BR').toLowerCase();

        if (process.env.ASAAS_WEBHOOK_TOKEN !== tokenSHA256) {
            return res.status(200).json({
                status: false,
                message: translate('invalid_session', lang)
            });
        }

        next();
    }
    /**
     * Verifica o nível de acesso
     */
    static role = (role: UserRole | UserRole[]) => {
        const validate = (req: express.Request, res: Response, next: () => void): Response => {
            const lang = (req.params.lang || 'pt-BR').toLowerCase();
            const user: GlobalUser = TokenManager.data(req);
            const notSameRole = Array.isArray(role) ? !role.includes(user.role) : role !== user.role;
            if (notSameRole) {
                return res.status(403).json({
                    status: false,
                    message: translate('permission_denied', lang)
                });
            }
            next();
        }
        return {
            validate
        };
    }
    /**
     * Verifica o nível de acesso baseado na role e no id do usuário que está fazendo a requisição
     */
    static whenUserOrRole = (role: UserRole | UserRole[], reqField: string) => {
        const validate = (req: express.Request, res: Response, next: () => void): Response => {
            const lang = (req.params.lang || 'pt-BR').toLowerCase();
            const user: GlobalUser = TokenManager.data(req);
            const notSameRole = Array.isArray(role) ? !role.includes(user.role) : role !== user.role;
            const notSameReqValue = req[reqField] !== user.userId;
            if (notSameRole && notSameReqValue) {
                return res.status(403).json({
                    status: false,
                    message: translate('permission_denied', lang)
                });
            }
            next();
        }
        return {
            validate
        };
    }
}
export default TokenManager;