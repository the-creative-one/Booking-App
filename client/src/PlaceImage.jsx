export default function PlaceImage({ place, index = 0, className = null }) {
  if (!place.photos?.length) {
    return "";
  }

  if (!className) {
    className = "object-cover";
  }

  return (
    <img
      className={className}
      src={"http://localhost:4000/uploads/" + place.photos[0]}
      alt={place.address}
    />
  );
}
