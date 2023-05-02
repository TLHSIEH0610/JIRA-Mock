import { useState, useEffect } from "react";
import { List } from "screens/project-list/list";
import { SearchPanel } from "screens/project-list/search-panel";
import { cleanObject, useMount, useDebounce } from "utils";
import { useHttp } from "utils/http";

export const ProjectListScreen = () => {
  const [param, setParam] = useState({ name: "", personId: "" });
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);
  const client = useHttp();

  const debouncedParam = useDebounce(param, 2000);

  useEffect(() => {
    client("projects", { data: cleanObject(debouncedParam) }).then(setList);
  }, [debouncedParam]);

  useMount(() => client("users").then(setUsers));

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />{" "}
      <List list={list} users={users} />
    </div>
  );
};
