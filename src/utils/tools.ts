import jwt from 'jsonwebtoken';
import { LamadaEvent } from '../type/Lamada';
import UserModel from '../models/user';

export const resReturn = (data: any, error?: number, msg = 'success') => {
    return {
        error: error || 0,
        msg,
        data
    };
};

const instances = new Map();
export const getModelInstance = (m) => {
    if (!instances.get(m)) {
        instances.set(m, new m());
    }
    return instances.get(m);
};

const secretKey = process.env.secretKey; // token生成密钥
const expiresIn = Number(process.env.expiresIn); // token有效时间  单位秒
// 生成token
export const jwtSign = (data: any) => {
    return jwt.sign(data, secretKey, { expiresIn });
};

//验证token
export const jwtVerify = (event: LamadaEvent): any => {
    return new Promise(async (resolve, reject) => {
        if (!event.headers.access_token) {
            reject({ message: '缺少token' });
        }
        const { access_token } = event.headers;
        try {
            const { account, password } = jwt.verify(access_token, secretKey) as any;
            const params = {
                TableName: 'zcy-user',
                IndexName: 'login-user',
                KeyConditionExpression: 'account = :ac and password = :pwd',
                ExpressionAttributeValues: { ':ac': account, ':pwd': password }
            };
            // 返回access_token对应的用户信息
            const res = await getModelInstance(UserModel).queryUserInfo(params);
            resolve(res[0]);
        } catch (error) {
            reject({ message: '无效token，请重新登录' });
        }
    });
};
