import BaseModel from './base';
import { PutItemInput, QueryInput } from '../type/DynamoDB';

class UserModel extends BaseModel {
    // 插入用户数据
    addUser(params: PutItemInput) {
        return new Promise((resolve, reject) => {
            this.docClient.put(params, (err, data) => (err ? reject(err) : resolve(data)));
        });
    }
    // 查询用户数据
    queryUserInfo(params: QueryInput) {
        return new Promise((resolve, reject) => {
            this.docClient.query(params, (err, data) => (err ? reject(err) : resolve(data.Items)));
        });
    }
}

export default UserModel;
