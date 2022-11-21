import { resReturn } from './utils/tools';
import routes from './router';
import { LamadaEvent } from './type/Lamada';

const lambdaHandler = async (event: LamadaEvent) => {
    const { method: m, path: p } = event.requestContext.http;
    for (let module in routes) {
        const { prefix, controller, api } = routes[module];
        const instance = new controller();
        for (let item of api) {
            const { action, method, path } = item;
            if (method === m && prefix + path === p) {
                const res = await instance[action].call(instance, event);
                return res;
            }
        }
    }
    return resReturn({}, 404, 'method or path not match');
};

exports.handler = lambdaHandler;
