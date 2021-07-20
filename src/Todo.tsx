import React from 'react';
import { Box } from '@material-ui/core';
import { Input } from '@material-ui/core';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import EditIcon from '@material-ui/icons/Edit';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import DeleteIcon from '@material-ui/icons/Delete';

interface TodoProps {
    todo: any,
    emptyHandler: () => void,
    todoDelete: (id: string) => void,
    todoEdit: (id: string, completed: boolean, text: string) => void,
    current: string,
    setCurrent: (current: string) => void,
    input: any,
    setInput: (text: any) => void,
    classes: any
}

const Todo: React.FC<TodoProps> = ({
    todo,
    emptyHandler,
    todoDelete,
    todoEdit,
    setCurrent,
    current,
    setInput,
    input,
    classes
}) => {
    const currentDate = new Date(todo.createdAt === todo.updatedAt ? todo.createdAt : todo.updatedAt);
    const currentMonth = currentDate.getMonth() <= 9 ? `0${currentDate.getMonth()}` : currentDate.getMonth();
    const currentDay = currentDate.getDate() <= 9 ? `0${currentDate.getDate()}` : currentDate.getDate()
    const fullDate = currentDay + ":" + currentMonth;

    const currentHours = currentDate.getHours() <= 9 ? `0${currentDate.getHours()}` : currentDate.getHours();
    const currentMinutes = currentDate.getMinutes() <= 9 ? `0${currentDate.getMinutes()}` : currentDate.getMinutes();
    const fullTime = currentHours + ":" + currentMinutes;

    const fullDateTime = fullDate + " - " + fullTime;

    return (
        <Box className={classes.box} key={todo.id + todo.createdAt}>
            <div className="todo-completed">
                <CheckBoxIcon onClick={() => todoEdit(todo.id, todo.completed, todo.text)} className={todo.completed === true ? classes.completed : classes.complete} />
            </div>
            {
                current === todo.id ? <div className="edit-todo">
                    <Input className="box-input" value={input} onChange={(e) => setInput(e.target.value)} />
                    <div className="edit">
                        <EditIcon onClick={() => { todoEdit(todo.id, !todo.completed, input); emptyHandler() }} />
                    </div>
                    <div onClick={emptyHandler} className="back"><KeyboardBackspaceIcon /></div>
                </div> : <div key={todo.id} onClick={() => { setCurrent(todo.id); setInput(todo.text) }} className={classes.boxText}>
                    <div className={classes.todoText}>{todo.text}</div>
                    <div className={classes.todoTime}>
                        <WatchLaterIcon className={classes.iconTime} />
                        <div>{fullDateTime}</div>
                    </div>
                </div>
            }
            <div className={classes.boxRemove}>
                <DeleteIcon onClick={() => todoDelete(todo.id)} className={classes.iconRemove} />
            </div>
        </Box>
    )
}

export default Todo
