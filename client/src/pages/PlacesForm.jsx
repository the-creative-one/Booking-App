import { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
import Perks from "../components/Perks";
import PhotoUploader from "../components/PhotoUploader";
import axios from "axios";
import ProfileNav from "./ProfileNav";
import { Navigate, useParams } from "react-router-dom";

export default function PlacesForm() {
  const { id } = useParams();
  console.log({ id });
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuest, setMaxGuest] = useState(1);
  const [price, setPrice] = useState(100);
  const [addedPhoto, setAddedPhoto] = useState([]);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setDescription(data.description);
      setAddedPhoto(data.photos);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuest(data.maxGuest);
      setPrice(data.price);
    });
  }, [id]);

  function inputHeader(text) {
    return <h2 className="text-2xl">{text}</h2>;
  }

  function inputPara(text) {
    return <p className="text-xs text-gray-400">* {text}</p>;
  }

  function inputLabel(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputPara(description)}
      </>
    );
  }

  // Function to handle the Place Form
  async function savedPlace(ev) {
    ev.preventDefault();
    const placeData = {
      title,
      address,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuest,
      addedPhoto,
      price,
    };
    if (id) {
      //  Updating a place
      await axios.put("/places", {
        id,
        ...placeData,
      });
      setRedirect(true);
    } else {
      // new place
      await axios.post("/places", placeData);
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/profile/places"} />;
  }

  return (
    <>
      <ProfileNav />
      <div className="mt-5">
        <form onSubmit={savedPlace}>
          {inputLabel(
            "Title",
            "Create a catchy, concise title for your listing that stands out."
          )}
          <input
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
            type="text"
            placeholder="Enter a title"
          />
          {inputLabel("Address", "Mention the exact location of you place.")}
          <input
            value={address}
            onChange={(ev) => setAddress(ev.target.value)}
            type="text"
            placeholder="Enter address"
          />
          {inputLabel("Photos", "Upload high-quality photos")}
          <PhotoUploader addedPhoto={addedPhoto} onChange={setAddedPhoto} />
          {inputLabel(
            "Description",
            "Write a brief description of your place, highlighting its features."
          )}
          <textarea
            rows="3"
            className="border mt-2 w-full rounded-sm px-3 py-2"
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
          />
          {inputLabel(
            "Perks",
            "Select the features available in your place, such as Wi-Fi, parking, etc."
          )}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 mt-3 mb-2">
            <Perks selected={perks} onChange={setPerks} />
          </div>
          {inputLabel(
            "Extra Info",
            "Share any important notes or special instructions for guests."
          )}
          <textarea
            rows="3"
            className="border mt-2 w-full rounded-sm px-3 py-2"
            value={extraInfo}
            onChange={(ev) => setExtraInfo(ev.target.value)}
          />
          {inputLabel(
            "Check-In & Check Out",
            "Enter the time guests can check in and the time they should check out."
          )}
          <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
            <div>
              <h3 className="mt-2 -mb-1 font-medium">Check-in time</h3>
              <input
                value={checkIn}
                onChange={(ev) => setCheckIn(ev.target.value)}
                type="text"
                placeholder="eg - 11:00"
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1 font-medium">Check out time</h3>
              <input
                value={checkOut}
                onChange={(ev) => setCheckOut(ev.target.value)}
                type="text"
                placeholder="eg - 21:00"
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1 font-medium">Max number of Guest</h3>
              <input
                value={maxGuest}
                onChange={(ev) => setMaxGuest(ev.target.value)}
                type="number"
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1 font-medium">Price per night</h3>
              <input
                value={price}
                onChange={(ev) => setPrice(ev.target.value)}
                type="number"
              />
            </div>
          </div>
          <div className="mt-3">
            <button className="login">Save</button>
          </div>
        </form>
      </div>
    </>
  );
}
