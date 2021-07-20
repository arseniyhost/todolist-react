import axios from "axios"
import { Dispatch } from "react"
import { ITodo, TodoAction, TodoActionTypes } from "../../types/types"


export const fetchTodos = () => {
    return async (dispatch: Dispatch<TodoAction>) => {
        try {
            dispatch({ type: TodoActionTypes.FETCH_TODOS })
            const response = await axios.get("https://tverdohleb-todo-backend.myvp.app/todos");
            dispatch(
                {
                    type: TodoActionTypes.FETCH_TODOS_SUCCESS,
                    payload: response.data
                })
        }
        catch (e) {
            dispatch({
                type: TodoActionTypes.FETCH_TODOS_ERROR,
                payload: "Произошла ошибка"
            })
        }
    }
}

export const fetchTodoAdd = (text: string) => {
    return async (dispatch: Dispatch<TodoAction>) => {
        try {
            const addTodo = await axios.post(`https://tverdohleb-todo-backend.myvp.app/todo`, { text: text })
            dispatch({
                type: TodoActionTypes.FETCH_TODO_ADD,
                payload: addTodo
            })
            const response = await axios.get("https://tverdohleb-todo-backend.myvp.app/todos");
            dispatch(
                {
                    type: TodoActionTypes.FETCH_TODOS_SUCCESS,
                    payload: response.data
                })
        }
        catch (error) {
            dispatch({
                type: TodoActionTypes.FETCH_TODOS_ERROR,
                payload: "Произошла ошибка"
            })
        }
    }
}

export const fetchTodoDelete = (id: string) => {
    return async (dispatch: Dispatch<TodoAction>) => {
        try {
            const deleteItem = await axios.delete(`https://tverdohleb-todo-backend.myvp.app/todo/${id}`)
            dispatch({
                type: TodoActionTypes.FETCH_TODO_DELETE,
                payload: id
            })
        }
        catch(error) {

        }
    }
}

export const fetchTodoEdit = (id: string, completed?: boolean, text?: string) => {
    return async (dispatch: Dispatch<TodoAction>) => {
        try {
            const editTodo = await axios.post(`https://tverdohleb-todo-backend.myvp.app/todo/${id}`, {
                text: text,
                completed: !completed
            })

            const response = await axios.get("https://tverdohleb-todo-backend.myvp.app/todos");
            dispatch(
                {
                    type: TodoActionTypes.FETCH_TODOS_SUCCESS,
                    payload: response.data
                })
        }
        catch (error) {

        }
    }
}