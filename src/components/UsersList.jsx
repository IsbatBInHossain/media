import { useSelector } from "react-redux";
import { addUser, fetchUsers, deleteUser } from "../store/store";
import Skeleton from "./Skeleton";
import Button from "./Button";
import { useThunk } from "../hooks/useThunk";
import { useEffect } from "react";
import User from "./User";

const UsersList = () => {
  const [runLoadUsers, isLoadingUsers, loadingUsersError] =
    useThunk(fetchUsers);
  const [runAddUsers, isCreatingUsers, creatingUsersError] = useThunk(addUser);

  useEffect(() => {
    runLoadUsers();
  }, [runLoadUsers]);

  const data = useSelector((state) => state.user.data);

  const handleAddUser = () => {
    runAddUsers();
  };

  let content;
  if (isLoadingUsers) {
    content = <Skeleton times={10} className="h-10 w-full" />;
  } else if (loadingUsersError) {
    content = <div>Error fetching data</div>;
  } else {
    content = data.map((user) => {
      return <User user={user} key={user.id} />;
    });
  }

  return (
    <div>
      <div className="flex justify-between flex-row m-3">
        <h1 className="m-2 text-xl">List of users:</h1>
        <Button loading={isCreatingUsers} onClick={handleAddUser}>
          + Add Users
        </Button>
        {creatingUsersError && "Error creating error"}
      </div>
      <div>{content}</div>
    </div>
  );
};
export default UsersList;
