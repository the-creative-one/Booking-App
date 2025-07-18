import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

export default function IndexPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces([...response.data]);
    });
  }, []);

  return (
    <div className="mt-8 grid gap-x-6 gap-y-9 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 &&
        places.map((place) => (
          <Link to={'/place/'+place._id} key={place._id}>
            <div className="bg-gray-200 rounded-xl flex mb-2">
              {place.photos?.[0] && (
                <img
                  src={"http://localhost:4000/uploads/" + place.photos?.[0]}
                  alt={place.title || "Place image"}
                  className="rounded-xl aspect-square object-cover h-65"
                />
              )}
            </div>
            <h2 className="font-bold text-sm">{place.address}</h2>
            <h3 className="font-light text-gray-700 text-sm leading-4">
              {place.title}
            </h3>
            <h4 className="text-sm mt-1">
              <span className="font-bold ">₹{place.price}</span> night
            </h4>
          </Link>
        ))}
    </div>
  );
}
