const url = 'http://localhost:3030/jsonstore/todos';

export const useTodosApi = () => {

    const removeTodo = (todoId) => {
        return fetch(`${url}/${todoId}`,
            { method: 'DELETE' })
            .then(res => res.json());
    };

    const createTodo = (text) => {

        const body = {  text, isCompleted: false}
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify(body)
        })
        .then(res => res.json());
    }

    return {
        removeTodo,
        createTodo
    }
}