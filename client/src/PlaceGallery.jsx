import { useState } from "react";
import PropTypes from "prop-types";

PlaceGallery.propTypes = {
  place: PropTypes.object.isRequired,
};

export default function PlaceGallery({ place }) {
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  return (
    <div className="relative">
      <div className="grid gap-2 grid-cols-[2fr_1fr] my-3 rounded-3xl overflow-hidden lg:h-96">
        <div className="grid">
          {place.photos?.[0] && (
            <img
              className="aspect-square lg:aspect-auto object-cover"
              src={"http://localhost:4000/uploads/" + place.photos[0]}
            />
          )}
        </div>
        <div className="grid">
          {place.photos?.[1] && (
            <img
              className="aspect-square lg:h-44 lg:w-96 object-cover lg:object-fill rounded-tr-3xl"
              src={"http://localhost:4000/uploads/" + place.photos[1]}
            />
          )}
          <div className="overflow-hidden">
            {place.photos?.[2] && (
              <img
                className="aspect-square object-cover lg:w-96 lg:object-fill relative top-2"
                src={"http://localhost:4000/uploads/" + place.photos[2]}
              />
            )}
          </div>
        </div>
      </div>
      {!showAllPhotos && (
        <button
          onClick={() => setShowAllPhotos(true)}
          className="flex gap-1 absolute bottom-8 right-2 px-4 py-1 bg-white text-violet-950 shadow shadow-black rounded-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 25"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          Show all photos
        </button>
      )}
      {showAllPhotos && (
        <div className="bg-white p-8">
          <h2 className="text-3xl text-center mb-4">Photos of {place.title}</h2>
          <div className="grid grid-cols-3 gap-4">
            {place.photos?.map((photo, index) => (
              <div key={index} className="aspect-square-container">
                <img
                  src={"http://localhost:4000/uploads/" + photo}
                  className="aspect-square"
                />
              </div>
            ))}
          </div>
          <button
            onClick={() => setShowAllPhotos(false)}
            className="flex gap-1 mt-4 mx-auto px-4 py-1 bg-white text-violet-950 shadow shadow-black rounded-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 25"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
            Close
          </button>
        </div>
      )}
    </div>
  );
}
