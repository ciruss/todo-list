import { Maybe } from "graphql/jsutils/Maybe"
import { Link, useParams } from "react-router-dom"
import { TodosPage } from "../common/types"

type Props = {
  todos: Maybe<TodosPage>;
  loading: boolean;
}

export default function TodoList({ todos, loading }: Props) {
  const { userId } = useParams();

  return (
    <>
      {loading ? <p>loading...</p> : (<div>
        {todos?.data?.map(todo => (
          <p className={todo?.completed ? 'completed' : ''} key={todo?.id}>
            <Link to={`${userId ? `/user/${userId}` : ''}/todo/${todo?.id}`}>{todo?.title}</Link>
          </p>
        ))}
      </div>)}
    </>
  )
}
