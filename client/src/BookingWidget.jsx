import { useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import BookingDialogBox from "./components/BookingDialogBox";
import PropTypes from "prop-types";

BookingWidget.propTypes = {
  place: PropTypes.object.isRequired,
};

export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [noOfGuests, setNoOfGuests] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  let noOfNights = 0;
  if (checkIn && checkOut) {
    noOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  const isBookingDisabled = !checkIn || !checkOut; // Disable button if check-in or check-out is empty

  // Function to handle opening the dialog
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  // Function to handle closing the dialog
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="p-6 bg-white border border-violet-300 shadow-md shadow-violet-200 rounded-xl">
      <div className="text-center text-xl underline underline-offset-8 text-violet-950">
        <span className=" font-semibold text-black">
          ₹{place.price.toLocaleString("en-IN")}
        </span>{" "}
        per night
      </div>
      <div className="mt-5 mb-3 border border-violet-300 rounded-lg">
        <div className="flex ">
          <div className="border-r border-violet-300  px-3 pt-3 pb-2">
            <label className="font-medium ps-1">Check-in: </label>
            <input
              className="outline-none focus:bg-violet-200 rounded p-1 "
              type="date"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
            />
          </div>
          <div className=" px-3 pt-3 pb-2">
            <label className="font-medium ps-1">Check-out: </label>
            <input
              className="outline-none focus:bg-violet-200 rounded p-1 "
              type="date"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
            />
          </div>
        </div>

        <div className=" px-3 pt-2 pb-2 border-t border-violet-300">
          <label className="font-medium ps-1">Number of guests </label>
          <input
            className="outline-none focus:outline-violet-400 focus:outline-1 bg-violet-100 rounded p-1 caret-violet-500 "
            type="number"
            value={noOfGuests}
            onChange={(ev) => setNoOfGuests(ev.target.value)}
          />
        </div>
      </div>
      <button
        className={`w-full text-white bg-primary py-1 my-2 rounded-md ${
          isBookingDisabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handleOpenDialog}
        disabled={isBookingDisabled}
      >
        Place Booking
      </button>
      {isDialogOpen && (
        <BookingDialogBox
          open={isDialogOpen}
          setOpen={setIsDialogOpen}
          onClose={handleCloseDialog}
          place={place} // Make sure to pass the place prop
          checkIn={checkIn} // Pass other necessary props
          checkOut={checkOut}
          noOfGuests={noOfGuests}
          price={noOfNights * place.price}
        />
      )}

      <div className="mt-3">
        <p className="flex justify-between font-normal text-sm me-8 mb-1">
          <span className="underline text-register">Number of Nights</span>
          <span className=" font-light">{noOfNights}</span>
        </p>
        <p className="flex justify-between font-normal text-sm me-8">
          <span className="underline text-register">Price per night</span>
          <span className=" font-light">
            {noOfNights}x ₹{place.price.toLocaleString("en-IN")}
          </span>
        </p>
        <p className="flex justify-between border-t-2 mt-3 pt-1 me-8">
          <span>Total price</span>
          <span className="">
            ₹{(noOfNights * place.price).toLocaleString("en-IN")}
          </span>
        </p>
      </div>
    </div>
  );
}
