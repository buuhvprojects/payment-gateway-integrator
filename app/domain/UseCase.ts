import { APIReturn } from "app/application/interfaces";

abstract class UseCase {
    protected abstract status: boolean;
    protected abstract message?: string;
    protected abstract values?: any;
    abstract get result(): APIReturn;
    abstract init(): Promise<void>;
}
export default UseCase;
