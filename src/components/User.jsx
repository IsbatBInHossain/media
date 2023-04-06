import { GoTrashcan } from "react-icons/go";
import Button from "./Button";
import { useThunk } from "../hooks/useThunk";
import { deleteUser } from "../store/store";

const User = ({ user }) => {
  const [runDeleteUser, isDeletingUser, error] = useThunk(deleteUser);
  const handleDeleteUser = () => {
    runDeleteUser(user);
  };
  return (
    <div className="mb-2 border rounded">
      <div className="flex p-2 justify-between items-center cursor-pointer">
        <div className="flex flex-row items-center justify-between">
          <Button
            className="mr-3"
            onClick={handleDeleteUser}
            loading={isDeletingUser}
          >
            <GoTrashcan />
          </Button>
          {error && <div>Error deleting User..</div>}
          {user.name}
        </div>
      </div>
    </div>
  );
};
export default User;
