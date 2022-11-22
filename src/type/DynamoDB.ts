import AWS from '../utils/aws';

export type DocumentClient = AWS.DynamoDB.DocumentClient;
export type PutItemInput = AWS.DynamoDB.DocumentClient.PutItemInput;
export type DeleteItemInput = AWS.DynamoDB.DocumentClient.DeleteItemInput;
export type UpdateItemInput = AWS.DynamoDB.DocumentClient.UpdateItemInput;
export type QueryInput = AWS.DynamoDB.DocumentClient.QueryInput;
