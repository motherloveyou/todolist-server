import BaseModel from './base';
import { PutItemInput, DeleteItemInput, UpdateItemInput, QueryInput } from '../type/DynamoDB';

class TodolistModel extends BaseModel {
    // 插入list
    addList(params: PutItemInput) {
        return new Promise((resolve, reject) => {
            this.docClient.put(params, (err, data) => (err ? reject(err) : resolve(data)));
        });
    }
    // 删除list
    deleteList(params: DeleteItemInput) {
        return new Promise((resolve, reject) => {
            this.docClient.delete(params, (err, data) => (err ? reject(err) : resolve(data)));
        });
    }
    // 更新list
    modifyList(params: UpdateItemInput) {
        return new Promise((resolve, reject) => {
            this.docClient.update(params, (err, data) => (err ? reject(err) : resolve(data)));
        });
    }
    // 查询list
    queryList(params: QueryInput, pattern: RegExp) {
        return new Promise((resolve, reject) => {
            this.docClient.query(params, (err, data) => (err ? reject(err) : resolve(data.Items.filter((v) => pattern.test(v.content)))));
        });
    }
}

export default TodolistModel;
