import UserModel from '../models/user';
import { getModelInstance, resReturn } from '../utils/tools';
import { LamadaEvent } from '../type/Lamada';

class UserController {
    userModel: any;
    defaultParams: Record<string, unknown>;
    constructor() {
        this.userModel = getModelInstance(UserModel);
        this.defaultParams = { TableName: 'zcy-user' }
    }
    // 注册
    async register(event: LamadaEvent) {
        const { account, password, checkPassword } = JSON.parse(event.body);
        if (password !== checkPassword) {
            return resReturn(undefined, 1, '两次密码输入不一致');
        }
        const params = {
            ...this.defaultParams,
            Item: { id: Date.now(), account, password }
        };
        try {
            await this.userModel.addUser(params);
            return resReturn(undefined);
        } catch (err) {
            return resReturn(undefined, err.statusCode, err.message);
        }
    }
    // 登录
    async login(event: LamadaEvent) {
        const { account, password } = JSON.parse(event.body);
        const params = {
            ...this.defaultParams,
            Key: { id: 1669022819032 }
        };
        try {
            const res = await this.userModel.getUserInfo(params);
            return resReturn(res);
        } catch (err) {
            return resReturn(undefined, err.statusCode, err.message);
        }
    }
}

export default UserController;
