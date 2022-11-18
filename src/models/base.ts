import AWS from '../utils/aws'
import { DocumentClient } from '../type/DynamoDB'

AWS.config.update({
    region: 'ap-southeast-1',
    accessKeyId: 'AKIARYTIFY6ZGGWIARVY',
    secretAccessKey: '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'
});

class BaseModel {
    docClient: DocumentClient;
    constructor() {
        this.docClient = new AWS.DynamoDB.DocumentClient();
    }
}

export default BaseModel;
