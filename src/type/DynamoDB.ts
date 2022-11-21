import AWS from '../utils/aws';

export type DocumentClient = AWS.DynamoDB.DocumentClient;
export type PutItemInput = AWS.DynamoDB.DocumentClient.PutItemInput;
export type DeleteItemInput = AWS.DynamoDB.DocumentClient.DeleteItemInput;
export type UpdateItemInput = AWS.DynamoDB.DocumentClient.UpdateItemInput;
export type ScanInput = AWS.DynamoDB.DocumentClient.ScanInput;
export type GetItemInput = AWS.DynamoDB.DocumentClient.GetItemInput;
