import { useParams } from "react-router"
import { useMutation, useQuery } from "@apollo/client";
import TodoList from "../components/TodoList";
import useTodoHandling from '../hooks/useTodoHandling';
import { CREATE_TODO } from '../operations/mutations/createTodo';
import { GET_USER_TODOS } from '../operations/queries/getUserTodos';
import { CreateTodoInput, QueryUserArgs, Todo, UserQuery } from "../common/types";
import { useState } from "react";

export default function SingleUser() {
  const { userId } = useParams();
  const [validationError, setValidationError] = useState(false);
  const { title, setTitle, completed, setCompleted, reset } = useTodoHandling();
  const { loading, data: user } = useQuery<UserQuery, QueryUserArgs>(GET_USER_TODOS, { variables: { id: String(userId) }});
  const [createTodo, { data }] = useMutation<
    { createTodo: Todo },
    { input: CreateTodoInput }
  >(CREATE_TODO, {
    variables: { input: { title, completed } }
  })

  const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (title.length < 3) {
      setValidationError(true);
      return;
    }
    setValidationError(false);
    if (!validationError) {
      createTodo();
      reset();
    }
    return;
  }

  return (
    <div>
      {loading ? <p>Loading...</p> : (
        <h2>{user?.user.name} ({user?.user.username})</h2>
      )}
      <h3>Create todo</h3>
      <form>
        <p>
          <label>Todo</label>
          <input value={title} type="text" name="title" onChange={e => setTitle(e.target.value)} />
          {validationError ? <p style={{ color: 'red' }}>Min legth of todo is 4 letters</p> : null}
        </p>
        <p>
          <label>Is todo completed</label>
          <input checked={completed} type="checkbox" name="completed" onChange={e => setCompleted(e.target.checked)} />
        </p>
        <button onClick={handleSubmit}>Add</button>
        {data?.createTodo?.id ? <h3 style={{ color: 'green' }}>Created</h3> : null}
      </form>
      <TodoList todos={user?.user?.todos} loading={loading} />
    </div>
  )
}
