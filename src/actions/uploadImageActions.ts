import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { firebaseApp } from "@/lib/firebase";
const { v4: uuidv4 } = require('uuid')

interface ImageModel {
  img: File | null
}

export async function uploadImageToFirebase(imgModel: ImageModel): Promise<string | null> {
  try {
    const storage = getStorage(firebaseApp);
    const randomId = uuidv4();
    const storageRef = ref(storage, `images/${randomId}.jpg`);
    const uploadTask = uploadBytesResumable(storageRef, imgModel.img as Blob);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          reject(error);
        },
        () => {
          // Upload tamamlandığında
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              resolve(downloadURL); 
            })
            .catch((error) => {
              reject(error);
            });
        }
      );
    });
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

