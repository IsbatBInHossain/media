import { useAddAlbumMutation, useFetchAlbumsQuery } from "../store/store";
import Album from "./Album";
import Button from "./Button";
import Skeleton from "./Skeleton";

const AlbumsList = ({ user }) => {
  const { data, isFetching, error } = useFetchAlbumsQuery(user);
  const [addAlbum, results] = useAddAlbumMutation();

  const handleAddAlbum = () => {
    addAlbum(user);
  };

  let content;
  if (isFetching) {
    content = <Skeleton className="h-10 w-full" times={3} />;
  } else if (error) {
    content = `Error fetching Albums of ${user.name}`;
  } else {
    content = data.map((album) => {
      return <Album key={album.id} album={album} />;
    });
  }

  return (
    <div>
      <div className="m-2 flex flex-row items-center justify-between">
        <h3 className="text-lg font-bold">Albums by {user.name}</h3>
        <Button
          onClick={handleAddAlbum}
          loading={results.isLoading || isFetching}
        >
          +Add Album
        </Button>
      </div>
      <div>{content}</div>
    </div>
  );
};
export default AlbumsList;
