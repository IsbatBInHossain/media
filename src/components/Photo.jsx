import { GoTrashcan } from "react-icons/go";
import { useDeletePhotoMutation } from "../store/store";

const Photo = ({ photo }) => {
  const [deletePhoto] = useDeletePhotoMutation();

  return (
    <div
      onClick={() => deletePhoto(photo)}
      className="relative m-2 cursor-pointer"
    >
      <img src={photo.url} alt="random photos" className="h-20 w-20" />
      <div className="flex absolute justify-center inset-0 items-center hover:bg-gray-200 hover:opacity-80 opacity-0">
        <GoTrashcan className="text-3xl" />
      </div>
    </div>
  );
};
export default Photo;
