import { useState } from "react";
import { List } from "screens/project-list/list";
import { SearchPanel } from "screens/project-list/search-panel";
import { useDebounce } from "utils";
import styled from "@emotion/styled";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { Typography } from "antd";

export const ProjectListScreen = () => {
  const [param, setParam] = useState({ name: "", personId: "" });
  const debouncedParam = useDebounce(param, 2000);
  const { isLoading, error, data: list } = useProjects(debouncedParam);
  const { data: users } = useUsers(debouncedParam);

  return (
    <Container>
      <h1>Project List</h1>
      <SearchPanel param={param} setParam={setParam} users={users || []} />{" "}
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List dataSource={list || []} users={users || []} loading={isLoading} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
