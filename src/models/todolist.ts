import BaseModel from './base';
import { PutItemInput, ScanInput } from '../type/DynamoDB'

class TodolistModel extends BaseModel {
    queryList(params: ScanInput) {
        return new Promise((resolve) => {
            this.docClient.scan(params, (err, data) => {
                if (err) {
                    resolve(err);
                } else {
                    resolve(data.Items);
                }
            });
        });
    }
    addList(params: PutItemInput) {
        return new Promise(resolve => {
            this.docClient.put(params, (err, data) => {
                if (err) {
                    resolve(err);
                } else {
                    resolve(data);
                }
            })
        })
    }
}

export default TodolistModel;
