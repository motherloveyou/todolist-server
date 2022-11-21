import BaseModel from './base'
import { PutItemInput, GetItemInput } from '../type/DynamoDB';

class UserModel extends BaseModel {
    // 插入用户数据
    addUser(params: PutItemInput) {
        return new Promise((resolve, reject) => {
            this.docClient.put(params, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }
    // 获取用户数据
    getUserInfo(params: GetItemInput) {
        return new Promise((resolve, reject) => {
            this.docClient.get(params, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }
}

export default  UserModel