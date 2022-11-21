import TodolistModel from '../models/todolist';
import { getModelInstance, resReturn } from '../utils/tools';
import { LamadaEvent } from '../type/Lamada';

class TodolistController {
    todolistModel: any;
    defaultParams: Record<string, unknown>;
    constructor() {
        this.todolistModel = getModelInstance(TodolistModel);
        this.defaultParams = { TableName: 'zcy-todolist' };
    }
    // 添加list
    async add(event: LamadaEvent) {
        const { content } = JSON.parse(event.body);
        const params = {
            ...this.defaultParams,
            Item: { id: Date.now(), content, done: false }
        };
        try {
            await this.todolistModel.addList(params);
            return resReturn(undefined);
        } catch (err) {
            return resReturn(undefined, err.statusCode, err.message);
        }
    }
    // 删除list
    async delete(event: LamadaEvent) {
        const { id } = JSON.parse(event.body);
        const params = {
            ...this.defaultParams,
            Key: { id }
        };
        try {
            await this.todolistModel.deleteList(params);
            return resReturn(undefined);
        } catch (err) {
            return resReturn(undefined, err.statusCode, err.message);
        }
    }
    // 修改list
    async modify(event: LamadaEvent) {
        const { id, content, done } = JSON.parse(event.body);
        const params = {
            ...this.defaultParams,
            Key: { id },
            UpdateExpression: 'set content = :c, done = :d',
            ExpressionAttributeValues: {
                ':c': content,
                ':d': done
            }
        };
        try {
            await this.todolistModel.modifyList(params);
            return resReturn(undefined);
        } catch (err) {
            return resReturn(undefined, err.statusCode, err.message);
        }
    }
    // 查询list
    async query(event: LamadaEvent) {
        const { searchContent } = event.queryStringParameters;
        const pattern = searchContent ? new RegExp(['', ...searchContent, ''].join('.*'), 'i') : /.*/;
        try {
            const res = await this.todolistModel.queryList(this.defaultParams, pattern);
            return resReturn(res);
        } catch (err) {
            return resReturn(undefined, err.statusCode, err.message);
        }
    }
}

export default TodolistController;
