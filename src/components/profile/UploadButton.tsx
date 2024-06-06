import { uploadImageToFirebase } from "@/actions/uploadImageActions";
import { faEdit, faPencil, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast from "react-hot-toast";

interface UploadBtnProps {
  setCoverUrl: (coverUrl: string | null) => void;
}

const UploadButton: React.FC<UploadBtnProps> = ({ setCoverUrl }) => {
  const uploadImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      let img = e.target.files[0];
      const downloadUrl = await uploadImageToFirebase({ img });
      setCoverUrl(downloadUrl);
      toast.success("Image has changed.");
    }
  };
  return (
    <label className="bg-gray-200 p-2 cursor-pointer rounded-lg">
      <FontAwesomeIcon icon={faPencil} />
      <input className="hidden" type="file" onChange={uploadImg} />
    </label>
  );
};

export default UploadButton;
