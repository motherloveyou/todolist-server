import TodolistModel from '../models/todolist';
import { getModelInstance, resReturn, jwtVerify } from '../utils/tools';
import { LamadaEvent } from '../type/Lamada';

class TodolistController {
    todolistModel: any;
    tableParams: Record<string, unknown>;
    constructor() {
        this.todolistModel = getModelInstance(TodolistModel);
        this.tableParams = { TableName: 'zcy-todolist' };
    }
    // 添加list
    async add(event: LamadaEvent) {
        try {
            const { id: userId } = await jwtVerify(event);
            const { content } = JSON.parse(event.body);
            const params = {
                ...this.tableParams,
                Item: { id: Date.now(), userId, content, done: false }
            };
            await this.todolistModel.addList(params);
            return resReturn(params.Item);
        } catch (err) {
            return resReturn(undefined, 1, err.message);
        }
    }
    // 删除list
    async delete(event: LamadaEvent) {
        try {
            await jwtVerify(event);
            const { id } = JSON.parse(event.body);
            const params = {
                ...this.tableParams,
                Key: { id }
            };
            await this.todolistModel.deleteList(params);
            return resReturn(undefined);
        } catch (err) {
            return resReturn(undefined, 1, err.message);
        }
    }
    // 修改list
    async modify(event: LamadaEvent) {
        try {
            await jwtVerify(event);
            const { id, content, done } = JSON.parse(event.body);
            const params = {
                ...this.tableParams,
                Key: { id },
                UpdateExpression: 'set content = :c, done = :d',
                ExpressionAttributeValues: { ':c': content, ':d': done }
            };
            await this.todolistModel.modifyList(params);
            return resReturn({ id, content, done });
        } catch (err) {
            return resReturn(undefined, 1, err.message);
        }
    }
    // 查询list
    async query(event: LamadaEvent) {
        try {
            const { id: userId } = await jwtVerify(event);
            const { searchContent } = event.queryStringParameters;
            const params = {
                ...this.tableParams,
                IndexName: 'userId-index',
                KeyConditionExpression: 'userId = :id',
                ExpressionAttributeValues: { ':id': userId }
            };
            const pattern = searchContent ? new RegExp(['', ...searchContent, ''].join('.*'), 'i') : /.*/;
            const res = await this.todolistModel.queryList(params, pattern);
            return resReturn(res);
        } catch (err) {
            return resReturn(undefined, 1, err.message);
        }
    }
}

export default TodolistController;
