export interface ITodo {
    id: string,
    text: string,
    createdAt: string,
    updatedAt: string,
    completed: boolean
}

export interface TodoState {
    todos: Array<ITodo>,
    loading: boolean,
    error: null | string
}

export enum TodoActionTypes {
    FETCH_TODOS = "FETCH_TODOS",
    FETCH_TODOS_SUCCESS = "FETCH_TODOS_SUCCESS",
    FETCH_TODOS_ERROR = "FETCH_TODOS_ERROR",
    FETCH_TODO_ADD = "FETCH_TODO_ADD",
    FETCH_TODO_DELETE = "FETCH_TODO_DELETE",
    FETCH_TODO_COMPLETED = "FETCH_TODO_COMPLETED"
}

interface FetchTodosAction {
    type: TodoActionTypes.FETCH_TODOS
}

interface FetchTodosSuccess {
    type: TodoActionTypes.FETCH_TODOS_SUCCESS,
    payload: any[]
}

interface FetchTodoAdd {
    type: TodoActionTypes.FETCH_TODO_ADD,
    payload: any
}

interface FetchTodosError {
    type: TodoActionTypes.FETCH_TODOS_ERROR,
    payload: string
}

interface FetchTodoDelete {
    type: TodoActionTypes.FETCH_TODO_DELETE,
    payload: string
}

interface FetchTodoCompleted {
    type: TodoActionTypes.FETCH_TODO_COMPLETED,
    payload: any
}

export type TodoAction =
    FetchTodosAction
    | FetchTodosSuccess
    | FetchTodosError
    | FetchTodoAdd
    | FetchTodoDelete
    | FetchTodoCompleted;
