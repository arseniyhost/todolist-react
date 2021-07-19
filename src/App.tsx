import { Container, Box } from '@material-ui/core';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import "./App.css";
import Todo from './Todo';
import { Input } from '@material-ui/core';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import BackspaceIcon from '@material-ui/icons/Backspace';

export interface ITodo {
  id: string,
  text: string,
  completed: boolean,
  createdAt: string,
  updatedAt: string
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [input, setInput] = useState<string>('');
  const [current, setCurrent] = useState<string>('');
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    fetchTodos()
  }, [todos])

  const activeHandler = () => {
    setActive(!active);
  }

  const fetchTodos = () => {
    axios.get<ITodo>('https://tverdohleb-todo-backend.myvp.app/todos')
      .then(
        (res: any) => {
          setTodos(res.data);
        });
  }

  const fetchTodoAdd = (textTodo: String) => {
    axios.post('https://tverdohleb-todo-backend.myvp.app/todo',
      {
        text: textTodo
      })
      .then((res) => {
        console.log(res)
      })
      .catch(error => {
        console.log(error);
      })
  }

  const fetchTodoEdit = (text: string, id: string) => {
    axios.post(`https://tverdohleb-todo-backend.myvp.app/todo/${id}`, {
      text: text
    })
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      })
  }

  const fetchTodoCompleted = (id: string, completed?: boolean, textTodo?: string) => {
    axios.post<ITodo>(`https://tverdohleb-todo-backend.myvp.app/todo/${id}`,
      {
        completed: !completed,
        text: textTodo
      })
      .then((res: any) => {
        console.log(res);
      })
      .catch((error: any) => {
        console.log(error);
      })
  }

  const fetchTodoDelete = (id: string) => {
    axios.delete<ITodo>(`https://tverdohleb-todo-backend.myvp.app/todo/${id}`)
      .then(res => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const emptyHandler = () => {
    setCurrent('');
    console.log(1);
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

  return (
    <Container maxWidth="sm">
      <div className="block-todos">
        {
          todos && todos.map((todo) => {
            return <Todo
              todo={todo}
              emptyHandler={emptyHandler}
              todoDelete={fetchTodoDelete}
              todoCompleted={fetchTodoCompleted}
              todoEdit={fetchTodoEdit}
              setCurrent={setCurrent}
              current={current}
              input={input}
              setInput={setInput}
            />
          })
        }
      </div>
      <Box>
        {
          active ? <div className="block-add">
            <Input placeholder="Ваше дело сегодня" onChange={(e) => setInput(e.target.value)} />
            <div className="add-todo">
              <PlaylistAddIcon onClick={addHandler} />
              <BackspaceIcon onClick={backHandler} className="back-icon" />
            </div>
          </div> : <div className="block-title" onClick={activeHandler}>
            <h2>What do today?</h2>
            <DoubleArrowIcon className="next" />
          </div>
        }
      </Box>
    </Container>
  )
}

export default App
