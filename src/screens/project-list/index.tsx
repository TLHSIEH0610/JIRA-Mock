import { useState, useEffect } from "react";
import { List } from "screens/project-list/list";
import { SearchPanel } from "screens/project-list/search-panel";
import { cleanObject, useMount, useDebounce } from "utils";
import { stringify } from "qs";

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  const [param, setParam] = useState({ name: "", personId: "" });
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);

  const debouncedParam = useDebounce(param, 2000);

  useEffect(() => {
    fetch(`${apiUrl}/projects?${stringify(cleanObject(debouncedParam))}`).then(
      async (response) => {
        if (response.ok) {
          setList(await response.json());
        }
      }
    );
  }, [debouncedParam]);

  useMount(() =>
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    })
  );

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />{" "}
      <List list={list} users={users} />
    </div>
  );
};
