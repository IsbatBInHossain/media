import ExpandablePanel from "./ExpandablePanel";
import Button from "./Button";
import { useDeleteALbumMutation } from "../store/store";
import { GoTrashcan } from "react-icons/go";
import PhotosList from "./PhotosList";

const Album = ({ album }) => {
  const [deleteAlbum, results] = useDeleteALbumMutation();
  const header = (
    <>
      <Button
        className="mr-3"
        onClick={() => deleteAlbum(album)}
        loading={results.isLoading}
      >
        <GoTrashcan />
      </Button>
      <h3>{album.title}</h3>
    </>
  );
  return (
    <ExpandablePanel key={album.id} header={header}>
      <PhotosList album={album} />
    </ExpandablePanel>
  );
};

export default Album;
