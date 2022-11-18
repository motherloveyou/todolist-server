import AWS from '../utils/aws'

export type DocumentClient = AWS.DynamoDB.DocumentClient
export type PutItemInput = AWS.DynamoDB.DocumentClient.PutItemInput
export type ScanInput = AWS.DynamoDB.DocumentClient.ScanInput
