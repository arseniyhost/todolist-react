import { Container, Box } from '@material-ui/core';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import "./App.css";
import Todo from './Todo';
import { Input, Typography } from '@material-ui/core';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import BackspaceIcon from '@material-ui/icons/Backspace';
import { useTypedSelector } from './hooks/useTypeSelector';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useActions } from './hooks/useAction';
import { makeStyles } from '@material-ui/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import EditIcon from '@material-ui/icons/Edit';

import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles({
  center: {
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    borderRadius: 10,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    padding: "20px",
    color: "white",
    margin: "20px auto"
  },
  box: {
    display: "flex",
    justifyContent: "space-between"
  },
  boxText: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "20px",
    flex: 1
  },
  todoText: {
    marginRight: "30px"
  },
  completed: {
    color: "#A6D631",
    cursor: "pointer",
    fontSize: "30px",
    marginRight: "25px",
    transition: ".2s all ease",
    "&:hover": {
      color: '#4caf50'
    }
  },
  complete: {
    color: "#b2b2b2",
    cursor: "pointer",
    fontSize: "30px",
    marginRight: "25px",
    transition: ".2s all ease",
    "&:hover": {
      color: '#A6D631'
    }
  },
  todoTime: {
    display: "flex",
    alignItems: "center"
  },
  iconTime: {
    fontSize: "25px",
    marginRight: "10px"
  },
  boxRemove: {
    marginLeft: "10px",
  },
  iconRemove: {
    cursor: "pointer",
    fontSize: "30px",
    color: "#dc004e",
    transition: ".2s all ease",
    "&:hover": {
      color: "#9a0036"
    }
  },
  iconAdd: {
    color: "green",
    fontSize: "25px",
    cursor: "pointer",
    margin: "0 25px"
  },
  iconBack: {
    color: "red",
    fontSize: "25px",
    cursor: "pointer"
  },
  blockAdd: {
    display: "flex",
    fontSize: "25px",
    padding: "20px 0"
  },
  inputBox: {
    flex: 1
  },
  next: {
    fontSize: "35px",
    cursor: "pointer",
    marginLeft: "35px"
  },
  boxTitle: {
    display: "flex",
    alignItems: "center",
    padding: "20px 0"
  }
})

const App: React.FC = () => {
  const classes = useStyles();
  const { todos, loading, error } = useTypedSelector(state => state.todo);
  const { fetchTodos, fetchTodoAdd, fetchTodoDelete, fetchTodoEdit } = useActions()
  const [input, setInput] = useState<string>('');
  const [current, setCurrent] = useState<string>('');
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    fetchTodos();
    console.log(todos);
  }, [])

  const activeHandler = () => {
    setActive(!active);
  }

  const emptyHandler = () => {
    setCurrent('');
  }

  const backHandler = () => {
    activeHandler();
    setInput('')
  }

  const addHandler = () => {
    if (input === '') {
      alert('Заполните поле!')
    } else {
      fetchTodoAdd(input)
      activeHandler();
      setInput('')
    }
  }

  if (loading) {
    return <CircularProgress />
  }

  if (error) {
    return <h1>Error</h1>
  }

  return (
    <Container className={classes.center} maxWidth="md">
      <h1>Todo List Today</h1>
      {
        todos.map(todo => {
          return <Todo
            todo={todo}
            todoDelete={fetchTodoDelete}
            todoEdit={fetchTodoEdit}
            input={input}
            setInput={setInput}
            emptyHandler={emptyHandler}
            classes={classes}
            setCurrent={setCurrent}
            current={current}
          />
        })}
      {
        active ? <div className={classes.blockAdd}>
          <div className={classes.inputBox}>
            <Input className="box-input" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ваше дело сегодня" />
          </div>
          <div>
            <PlaylistAddIcon className={classes.iconAdd} onClick={addHandler} />
            <BackspaceIcon onClick={backHandler} className={classes.iconBack} />
          </div>
        </div> : <div className={classes.boxTitle}><Typography variant="h4" component="h3">
          What you want to do today?</Typography> <Tooltip title="Add" aria-label="add"><DoubleArrowIcon className={classes.next} onClick={activeHandler} /></Tooltip>
        </div>

      }

    </Container>
  )
}

export default App
