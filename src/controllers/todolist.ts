import todolistModel from '../models/todolist'
import { getModelInstance, resReturn } from '../utils/tools'

class TodolistController {
    todolistModel: any
  constructor () {
    this.todolistModel = getModelInstance(todolistModel)
  }
  // 添加list
  async add () {
    
  }
  // 删除list
  async delete () {
    
  }
  // 修改list
  async modify () {
    
  }
  // 查询list
  async query () {
    const res = await this.todolistModel.queryList({ TableName: 'zcy-todolist' })
    return resReturn(res)
  }
}

export default TodolistController