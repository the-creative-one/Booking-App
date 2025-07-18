import axios from "axios";
import { useState } from "react";
import PropTypes from "prop-types";

export default function PhotoUploader({ addedPhoto, onChange }) {
  // instead of using state for the addedPhoto , we should pass it as a props
  //   const [addedPhoto, setAddedPhoto] = useState([]);
  const [linkPhoto, setLinkPhoto] = useState("");

  // Function to add photo using link
  async function addPhotoByLink(ev) {
    ev.preventDefault();
    axios
      .post("/upload-by-link", { link: linkPhoto })
      .then(({ data: filename }) => {
        onChange((prev) => [...prev, filename]);
        setLinkPhoto("");
      })
      .catch((error) => {
        console.error("Error uploading photo by link:", error);
        // Handle the error appropriately
      });
  }

  // async function addPhotoByLink(ev) {
  //   ev.preventDefault();
  //   const { data: filename } = await axios.post("/upload-by-link", {
  //     link: linkPhoto,
  //   });
  //   // setAddedPhoto - instead of this , using onChange (as we're not using states)
  //   onChange((prev) => {
  //     return [...prev, filename];
  //   });
  //   setLinkPhoto("");
  // }

  // Function to upload photo from our device

  //? instead of async-await , we can also use the .then()
  function uploadPhoto(ev) {
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    axios
      .post("/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        console.log("Upload successful, response:", response.data);
        onChange((prev) => [...prev, ...response.data]);
      })
      .catch((error) => {
        console.error("Error uploading files:", error.response || error);
        // This will help you understand if it's a network error, or data related issue
      });
  }

  // function uploadPhoto(ev) {
  //   const files = ev.target.files;
  //   console.log({ files });
  //   const data = new FormData();
  //   for (let i = 0; i < files.length; i++) {
  //     data.append("photos", files[i]);
  //   }
  //   axios
  //     .post("/upload", data, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     })
  //     .then((res) => {
  //       const { data: filenames } = res;
  //       onChange((prev) => {
  //         return [...prev, ...filenames];
  //       });
  //     });
  // }

  //? Function to remove photo
  function removePhoto(ev, filename) {
    ev.preventDefault();
    onChange([...addedPhoto.filter((photo) => photo !== filename)]);
  }

  // Function to select a photo as main photo
  function selectMainPhoto(ev, filename) {
    ev.preventDefault();
    onChange([filename, ...addedPhoto.filter((photo) => photo !== filename)]);
  }

  // defining propTypes

  PhotoUploader.propTypes = {
    addedPhoto: PropTypes.array.isRequired, // Define as an array and mark as required
    onChange: PropTypes.func.isRequired, // Define as a function and mark as required
  };

  return (
    <>
      <div className="flex gap-2">
        <input
          value={linkPhoto}
          onChange={(ev) => setLinkPhoto(ev.target.value)}
          type="text"
          placeholder="Add via link . . . ."
        />
        <button
          onClick={addPhotoByLink}
          className="px-4 rounded-sm bg-violet-100 my-2"
        >
          Add&nbsp;Photo
        </button>
      </div>
      <div className="my-2 gap-1 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 rounded-md">
        {addedPhoto.length > 0 &&
          addedPhoto.map((link) => (
            <div key={link} className="flex relative h-32">
              <img
                src={`http://localhost:4000/uploads/${link}`}
                alt={link}
                className="w-full object-cover"
              />
              <button
                onClick={(ev) => removePhoto(ev, link)}
                className="cursor-pointer absolute bottom-1 right-1 rounded-full text-white bg-black bg-opacity-60 p-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
              <button
                onClick={(ev) => selectMainPhoto(ev, link)}
                className="cursor-pointer absolute bottom-1 left-1 rounded-full text-white bg-black bg-opacity-60 p-1"
              >
                {link !== addedPhoto[0] && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    />
                  </svg>
                )}
                {link === addedPhoto[0] && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            </div>
          ))}
        <label className="h-32 cursor-pointer flex justify-center items-center gap-1 bg-transparent border p-2 font-light rounded-sm text-gray-500">
          <input
            type="file"
            multiple
            className="hidden"
            onChange={uploadPhoto}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.1}
            stroke="currentColor"
            className="w-5 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Upload
        </label>
      </div>
    </>
  );
}
