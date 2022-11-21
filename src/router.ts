import TodolistController from './controllers/todolist';
import UserController from './controllers/user';

const routes = {
    todolist: {
        prefix: '/todolist',
        controller: TodolistController,
        api: [
            {
                action: 'add',
                method: 'POST',
                path: '/add'
            },
            {
                action: 'delete',
                method: 'POST',
                path: '/delete'
            },
            {
                action: 'modify',
                method: 'POST',
                path: '/modify'
            },
            {
                action: 'query',
                method: 'GET',
                path: '/query'
            }
        ]
    },
    user: {
        prefix: '/user',
        controller: UserController,
        api: [
            {
                action: 'register',
                method: 'POST',
                path: '/register'
            },
            {
                action: 'login',
                method: 'POST',
                path: '/login'
            }
        ]
    }
};

export default routes;
