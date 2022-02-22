import { useState } from "react";
import debounce from 'lodash.debounce';
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import TodoList from "../components/TodoList";
import { OperatorKindEnum, PageQueryOptions, SortOrderEnum, TodosQuery, UsersQuery } from "../common/types";
import { GET_ALL_TODOS } from "../operations/queries/getAllTodos";
import { GET_ALL_USERS } from "../operations/queries/getAllUsers";

const defaultOptions: PageQueryOptions = {
  slice: {
    limit: 200
  },
  sort: [
    {
      field: 'id',
      order: SortOrderEnum['Asc'],
    }
  ]
}; 

export default function Home() {
  const [filterOptions, setFilterOptions] = useState<PageQueryOptions>(defaultOptions);
  const { data: users } = useQuery<UsersQuery>(GET_ALL_USERS);
  const { data: todos, loading: todosLoading } = useQuery<TodosQuery>(GET_ALL_TODOS, {
    variables: { options: filterOptions }
  });

  const desbouncedSearched = debounce(search => {
    setFilterOptions({
      ...filterOptions,
      search: {
        q: search,
      }
    })
  }, 300);

  const handleTitleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    desbouncedSearched(e.target.value);
  }

  const handleCompletedSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterOptions({
      ...filterOptions,
      operators: [
        {
          field: 'completed',
          value: String(e.target.value),
          kind: OperatorKindEnum['Like'],
        }
      ]
    })
  }

  return (
    <main>
      <div>
        <h2>User</h2>
        <ul>
          {users?.users?.data?.map(user => (
            <li key={user?.id}>
              <Link to={`user/${user?.id}`} >{user?.name} ({user?.username})</Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Todos</h2>
        <fieldset>
          <legend>Filter</legend>
          <p>
            <label htmlFor="todo">Search by text</label>
            <input type="text" id="todo" onChange={handleTitleSearch} />
          </p>
          <p>
            <label htmlFor="completed">Sort by completed</label>
            <select id="completed" onChange={handleCompletedSort}>
              <option value=""></option>
              <option value="true">Completed</option>
              <option value="false">Not Completed</option>
            </select>
          </p>
        </fieldset>
        <TodoList todos={todos?.todos} loading={todosLoading} />
      </div>
    </main>
  )
}