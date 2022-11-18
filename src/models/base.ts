import AWS from '../utils/aws';
import { DocumentClient } from '../type/DynamoDB';

AWS.config.update({
    region: 'ap-southeast-1',
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey
});

class BaseModel {
    docClient: DocumentClient;
    constructor() {
        this.docClient = new AWS.DynamoDB.DocumentClient();
    }
}

export default BaseModel;
