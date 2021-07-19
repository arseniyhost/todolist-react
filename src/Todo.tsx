import React from 'react';
import { Box } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { Input } from '@material-ui/core';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import EditIcon from '@material-ui/icons/Edit';

interface TodoProps {
    todo: any,
    emptyHandler: () => void,
    todoDelete: (id: string) => void,
    todoCompleted: (id: string, completed: boolean, text: string) => void,
    todoEdit: (input: string, id: string) => void,
    current: string,
    setCurrent: (current: string) => void,
    input: any,
    setInput: (text: any) => void
}

const Todo: React.FC<TodoProps> = ({
    todo,
    emptyHandler,
    todoDelete,
    todoCompleted,
    todoEdit, setCurrent,
    current,
    setInput,
    input
}) => {
    const currentDate = new Date(todo.createdAt);
    const currentMonth = currentDate.getMonth() <= 9 ? `0${currentDate.getMonth()}` : currentDate.getMonth();
    const currentDay = currentDate.getDate() <= 9 ? `0${currentDate.getDate()}` : currentDate.getDate()
    const fullDate = currentDay + ":" + currentMonth;

    const currentHours = currentDate.getHours() <= 9 ? `0${currentDate.getHours()}` : currentDate.getHours();
    const currentMinutes = currentDate.getMinutes() <= 9 ? `0${currentDate.getMinutes()}` : currentDate.getMinutes();
    const fullTime = currentHours + ":" + currentMinutes;

    const fullDateTime = fullDate + " - " + fullTime;

    return (
        <Box className="todo" key={todo.id}>
            <div className="completed" onClick={() => todoCompleted(todo.id, todo.completed, todo.text)}>
                {todo.completed === true ? <CheckCircleIcon className="true" />
                    : <CheckCircleOutlineIcon className="false" />}
            </div>
            {
                current === todo.id ? <div className="edit-todo">
                    <Input value={input} onChange={(e) => setInput(e.target.value)} />
                    <div onClick={() => { todoEdit(input, todo.id); setCurrent('') }} className="edit">
                        <EditIcon />
                    </div>
                    <div onClick={emptyHandler} className="back"><KeyboardBackspaceIcon /></div>
                </div> : <div>
                    <div onClick={() => { setCurrent(todo.id); setInput(todo.text) }} className="todo-text">{todo.text}</div>
                    <div>{fullDateTime}</div>
                </div>
            }
            <div className="remove" onClick={() => todoDelete(todo.id)}><RemoveCircleIcon /></div>
        </Box>
    )
}

export default Todo
