import UserModel from '../models/user';
import { getModelInstance, resReturn, jwtSign } from '../utils/tools';
import { LamadaEvent } from '../type/Lamada';

class UserController {
    userModel: any;
    tableParams: Record<string, unknown>;
    constructor() {
        this.userModel = getModelInstance(UserModel);
        this.tableParams = { TableName: 'zcy-user' };
    }
    // 注册
    async register(event: LamadaEvent) {
        const { account, password, checkPassword } = JSON.parse(event.body);
        if (password !== checkPassword) {
            return resReturn(undefined, 1, '两次密码输入不一致');
        }
        const checkParams = {
            ...this.tableParams,
            IndexName: 'check-repeat-index',
            KeyConditionExpression: 'account = :ac',
            ExpressionAttributeValues: { ':ac': account }
        };
        try {
            const res = await this.userModel.queryUserInfo(checkParams);
            if (res[0]) return resReturn(undefined, 1, '账号已存在');
            const addParams = {
                ...this.tableParams,
                Item: { id: Date.now(), account, password }
            };
            await this.userModel.addUser(addParams);
            return resReturn(undefined);
        } catch (err) {
            return resReturn(undefined, 1, err.message);
        }
    }
    // 登录
    async login(event: LamadaEvent) {
        const { account, password } = JSON.parse(event.body);
        const params = {
            ...this.tableParams,
            IndexName: 'login-user',
            KeyConditionExpression: 'account = :ac and password = :pwd',
            ExpressionAttributeValues: { ':ac': account, ':pwd': password }
        };
        try {
            const res = await this.userModel.queryUserInfo(params);
            if (res[0]) {
                const access_token = jwtSign({ account, password });
                return resReturn({ access_token });
            }
            return resReturn(undefined, 1, '账号或密码错误');
        } catch (err) {
            return resReturn(undefined, 1, err.message);
        }
    }
}

export default UserController;
