import { useEffect } from "react";
import { Project } from "screens/project-list/list";
import { cleanObject } from "utils";
import { useHttp } from "utils/http";
import { useAsync } from "./useAsync";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();

  useEffect(() => {
    run(client("projects", { data: cleanObject(param || {}) }));
  }, [param]);

  return result;
};

export const useEditProject = () => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();
  const mutate = (params: Partial<Project>) =>
    run(
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      })
    );

  return { mutate, ...result };
};

export const useAddProject = () => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();
  const mutate = (params: Partial<Project>) =>
    run(
      client(`projects/${params.id}`, {
        data: params,
        method: "POST",
      })
    );

  return { mutate, ...result };
};
