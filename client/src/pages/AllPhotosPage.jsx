// import React from "react";
import PropTypes from "prop-types";

function AllPhotosPage({ photos }) {
  return (
    <div className="bg-white p-8">
      <h2 className="text-3xl text-center mb-4">All Photos</h2>
      <div className="grid grid-cols-3 gap-4">
        {photos.map((photo, index) => (
          <div key={index} className="aspect-square-container">
            <img
              src={"http://localhost:4000/uploads/" + photo}
              className="aspect-square"
              alt={`Photo ${index}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

AllPhotosPage.propTypes = {
  photos: PropTypes.array.isRequired,
};

export default AllPhotosPage;
