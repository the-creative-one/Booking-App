import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "./../UserContext";
import PropTypes from "prop-types";

BookingDialogBox.propTypes = {
  open: PropTypes.bool.isRequired,
  // setOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  place: PropTypes.object.isRequired,
  checkIn: PropTypes.string.isRequired,
  checkOut: PropTypes.string.isRequired,
  noOfGuests: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
};

export default function BookingDialogBox({
  open,
  // setOpen,
  onClose,
  place,
  checkIn,
  checkOut,
  noOfGuests,
  price,
}) {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [redirect, setRedirect] = useState("");
  const { user } = useContext(UserContext);

  const cancelButtonRef = useRef(null);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  // Function to handle booking the place
  async function bookThisPlace() {
    if (!name.trim() || !phone.trim()) {
      console.error("Name and phone are required");
      return;
    }
    const response = await axios.post("/bookings", {
      checkIn,
      checkOut,
      noOfGuests,
      name,
      phone,
      place: place._id,
      price,
    });
    const bookingId = response.data._id;
    setRedirect(`/profile/bookings/${bookingId}`);
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-y-auto"
        onClose={onClose}
        initialFocus={cancelButtonRef}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="md:ms-36 font-semibold leading-6 text-gray-900"
                      >
                        Enter Your Details
                      </Dialog.Title>
                      <div className="mt-2">
                        <div className=" border-violet-300 pt-3 pb-2">
                          <label className="font-medium ">Full Name</label>
                          <input
                            className="outline-none focus:bg-violet-200 rounded p-1 "
                            type="text"
                            value={name}
                            onChange={(ev) => setName(ev.target.value)}
                          />
                          <label className="font-medium ">Phone Number</label>
                          <input
                            className="outline-none focus:bg-violet-200 rounded p-1 "
                            type="tel"
                            value={phone}
                            onChange={(ev) => setPhone(ev.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-600 sm:ml-3 sm:w-auto"
                    onClick={bookThisPlace}
                  >
                    Confirm Booking
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={onClose}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
