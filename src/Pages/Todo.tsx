import { useNavigate, useParams } from "react-router"
import { useMutation, useQuery } from "@apollo/client"
import { Todo, TodoQuery, UpdateTodoInput } from "../common/types";
import { GET_TODO } from "../operations/queries/getTodo"
import { DELETE_TODO } from "../operations/mutations/deleteTodo";
import { UPDATE_TOOD } from "../operations/mutations/updateTodo";
import useTodoHandling from "../hooks/useTodoHandling";

export default function SingleTodo() {
  const { todoId } = useParams();
  const navigate = useNavigate();
  const { title, setTitle, completed, setCompleted } = useTodoHandling();
  const { loading, data } = useQuery<TodoQuery>(GET_TODO, {
    variables: { id: String(todoId) },
    onCompleted: data => {
      setTitle(data.todo.title);
      setCompleted(data.todo.completed);
    }
  })
  const [deleteTodo] = useMutation<
    { deleteTodo: Todo },
    { id: string }
  >(DELETE_TODO, {
    variables: { id: String(todoId) }
  })
  const [updateTodo, { data: updatedTodo }] = useMutation<
    { updateTodo: Todo },
    { id: string, input: UpdateTodoInput }
  >(UPDATE_TOOD, {
    variables: {
      id: String(todoId),
      input: { title, completed },
    }
  })

  const handleDelete = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    deleteTodo();
    navigate(-1);
  }

  const handleUpdate = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    updateTodo();
  }

  return (
    <div>
      <h1>VALIDATIONS</h1>
      <h2>Todo{data?.todo.user.username ? ` by ${data.todo.user.username}` : ''}</h2>
      {loading ? <p>Loading...</p> : (
        <form>
          <p>
            <label>Title</label>
            <input value={title} type="text" name="title" onChange={e => setTitle(String(e.target.value))} />
          </p>
          <p>
            <label>Completed</label>
            <input type="checkbox" name="completed" checked={completed} onChange={e => setCompleted(e.target.checked)} />
          </p>
          {updatedTodo?.updateTodo.id ? <h3 style={{ color: 'green'}}>Updated</h3> : null}
          <button type="button" style={{ color: 'red' }} onClick={handleDelete}>Delete</button>
          <button type="button" style={{ color: 'green' }} onClick={handleUpdate}>Update</button>
        </form>
      )}
    </div>
  )
}
