interface Lprops {
  list: { name: string; id: string; personId: string }[];
  users: { name: string; id: string }[];
}

export const List = ({ list, users }: Lprops) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Owner</th>
        </tr>
      </thead>
      <tbody>
        {list.map((project) => (
          <tr key={project.id}>
            <td>{project.name}</td>
            <td>
              {users.find((u) => u.id === project.personId)?.name || "unknow"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
