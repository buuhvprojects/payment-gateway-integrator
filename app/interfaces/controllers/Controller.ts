import { GlobalUser, Response } from "app/application/interfaces";
import TokenManager from "app/common/TokenManager";
import UseCase from "app/domain/UseCase";
import { Request } from "express";
import {
    KafkaDispatch,
    kafkaDispatchEvent,
} from '@buuhvprojects/chassis-microservice/dist/server';


class Controller {
    protected user: GlobalUser;
    protected lang = 'pt-br';
    protected jwt = '';
    constructor(protected readonly req: Request, protected readonly res: Response) {
        this.user = TokenManager.data(this.req);
        const authorization = this.req.headers['Authorization'] as string || this.req.headers['authorization'] || '';
        this.jwt = authorization.replace('Bearer ', '');
        this.lang = req.headers['x-lang'] as string | undefined || 'pt-br';
    }
    protected execute = async (useCase: UseCase | Function) => {
        try {
            if (useCase instanceof UseCase) {
                await useCase.init();
                return this.res.status(200).json(useCase.result);
            } else {
                return useCase();
            }
        } catch (error) {
            console.error('Controller.execute', error instanceof Error ? error.message : error);
            return this.res.status(422).json({
                status: false,
                message: error instanceof Error ? error.message : JSON.stringify(error)
            });
        }
    }
    public kafkaDispatch = (data: KafkaDispatch) => {
        this.req.app.emit(kafkaDispatchEvent, data);
    }
}
export default Controller;