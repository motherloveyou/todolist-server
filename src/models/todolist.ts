import BaseModel from './base';
import { PutItemInput, DeleteItemInput, UpdateItemInput, ScanInput } from '../type/DynamoDB';

class TodolistModel extends BaseModel {
    // 插入list
    addList(params: PutItemInput) {
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
    // 删除list
    deleteList(params: DeleteItemInput) {
        return new Promise((resolve, reject) => {
            this.docClient.delete(params, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }
    // 更新list
    modifyList(params: UpdateItemInput) {
        return new Promise((resolve, reject) => {
            this.docClient.update(params, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }
    // 查询list
    queryList(params: ScanInput, pattern: RegExp) {
        return new Promise((resolve, reject) => {
            this.docClient.scan(params, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    const res = data.Items.filter((v) => pattern.test(v.content));
                    resolve(res);
                }
            });
        });
    }
}

export default TodolistModel;
