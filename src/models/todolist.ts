import BaseModel from './base';
import { ScanInput } from '../type/DynamoDB'

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
}

export default TodolistModel;
