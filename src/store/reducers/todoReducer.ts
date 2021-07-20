import { TodoAction, TodoActionTypes, TodoState } from "../../types/types"

const initialState: TodoState = {
    todos: [],
    loading: false,
    error: null
}

export const todoReducer = (state = initialState, action: TodoAction) => {
    switch (action.type) {
        case TodoActionTypes.FETCH_TODOS:
            return {
                ...state, loading: true, todos: []
            }

        case TodoActionTypes.FETCH_TODOS_SUCCESS:
            return {
                ...state, loading: false, todos: action.payload
            }
        case TodoActionTypes.FETCH_TODOS_ERROR:
            return {
                ...state, error: action.payload, todos: []
            }
        case TodoActionTypes.FETCH_TODO_ADD:
            return {
                ...state, todos: [...state.todos, action.payload]
            }
        case TodoActionTypes.FETCH_TODO_DELETE:
            return {
                ...state, todos: state.todos.filter((todo) => todo.id !== action.payload)
            }
        default:
            return state
    }
}