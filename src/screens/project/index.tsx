import React from "react";
import { Link } from "react-router-dom";
import { Navigate, Route, Routes } from "react-router";
import { KanbanScreen } from "screens/kanban";
import { EpicScreen } from "screens/epic";

export const ProjectScreen = () => {
  return (
    <div>
      <h1>ProjectScreen</h1>
      <Link to={"kanban"}>Kanban</Link>
      <Link to={"epic"}>Epics</Link>
      <Routes>
        {/*projects/:projectId/kanban*/}
        <Route path={"kanban"} element={<KanbanScreen />} />
        {/*projects/:projectId/epic*/}
        <Route path={"epic"} element={<EpicScreen />} />
        <Route index element={<KanbanScreen />} />
      </Routes>
    </div>
  );
};
