import { GoTrashcan } from "react-icons/go";
import Button from "./Button";
import { useThunk } from "../hooks/useThunk";
import { deleteUser } from "../store/store";
import ExpandablePanel from "./ExpandablePanel";
import AlbumsList from "./AlbumsList";

const User = ({ user }) => {
  const [runDeleteUser, isDeletingUser, error] = useThunk(deleteUser);
  const handleDeleteUser = () => {
    runDeleteUser(user);
  };

  const header = (
    <>
      <Button
        className="mr-3"
        onClick={handleDeleteUser}
        loading={isDeletingUser}
      >
        <GoTrashcan />
      </Button>
      {error && <div>Error deleting User..</div>}
      {user.name}
    </>
  );
  const children = (
    <>
      <AlbumsList user={user} />
    </>
  );

  return <ExpandablePanel header={header}>{children}</ExpandablePanel>;
};
export default User;
