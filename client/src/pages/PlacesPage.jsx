import { Link } from "react-router-dom";

import ProfileNav from "./ProfileNav";
import { useEffect, useState } from "react";
import axios from "axios";
import { FiEdit } from "react-icons/fi";
import PlaceImage from "../PlaceImage";

export default function PlacesPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/user-places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  return (
    <>
      <ProfileNav />
      <div className=" mt-10 text-center">
        <Link
          className="inline-flex gap-1 bg-primary text-white py-2 ps-4 pe-8 rounded-full max-w-xs"
          to={"/profile/places/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.6}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v12m6-6H6"
            />
          </svg>
          Add new place
        </Link>
      </div>
      <div className="mt-5">
        {places.length > 0 &&
          places.map((place, index) => (
            <div key={index} className="flex gap-4 p-4 bg-gray-50 mb-6">
              <div className="flex bg-gray-200 shrink-0 w-32 h-32 ">
                <PlaceImage place={place} />
              </div>
              <div className="whitespace-pre-line">
                <h2 className="text-xl mb-2">{place.title}</h2>
                <p className=" text-sm">{place.description}</p>
              </div>
              <Link to={"/profile/places/" + place._id}>
                <FiEdit className=" text-lg text-violet-500 cursor-pointer" />
              </Link>
            </div>
          ))}
      </div>
    </>
  );
}
