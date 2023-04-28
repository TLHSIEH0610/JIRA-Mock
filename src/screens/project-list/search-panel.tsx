export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
}

interface SearchPanelprops {
  param: { name: string; personId: string };
  setParam: (arg: SearchPanelprops["param"]) => void;
  users: User[];
}

export const SearchPanel = ({ param, setParam, users }: SearchPanelprops) => {
  return (
    <form>
      <input
        type="text"
        value={param.name}
        onChange={({ target: { value } }) =>
          setParam({ ...param, name: value })
        }
      />
      <select
        value={param.personId}
        onChange={({ target: { value } }) =>
          setParam({ ...param, personId: value })
        }
      >
        <option value={"|"}>Responsible Person</option>
        {users.map((u) => (
          <option value={u.id} key={u.id}>
            {u.name}
          </option>
        ))}
      </select>
    </form>
  );
};
