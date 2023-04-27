interface Sprops {
  param: { name: string; personId: string };
  setParam: (arg: any) => void;
  users: { name: string; id: string }[];
}

export const SearchPanel = ({ param, setParam, users }: Sprops) => {
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
