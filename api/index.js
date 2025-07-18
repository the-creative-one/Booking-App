const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("./models/UserModel");
const CookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");
const PlaceModel = require("./models/PlaceModel");
const path = require("path");
const BookingModel = require("./models/BookingModel");
const { error } = require("console");

require("dotenv").config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
// secret ↓
const jwtSecret = "asdfgh123456jkl789";

// MiddleWares ↓
app.use(express.json());
app.use(CookieParser());
app.use("/uploads", express.static(__dirname + "\\uploads\\"));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

mongoose.connect(process.env.MONGO_URL);

function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (error, user) => {
      if (error) throw error;
      resolve(user);
    });
  });
}

app.get("/test", (req, res) => {
  res.json("Test okay!");
});
// Create User ↓
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await UserModel.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(422).json(error);
  }
});

// Login User ↓
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    const confPass = bcrypt.compareSync(password, user.password);
    if (confPass) {
      jwt.sign(
        {
          email: user.email,
          id: user._id,
          // name: user.name,
        },
        jwtSecret,
        {},
        (error, token) => {
          if (error) throw error;
          res.cookie("token", token).json(user);
        }
      );
    } else {
      res.status(422).json("Password is incorrect!");
    }
  } else {
    res.json("Couldn't Find User!");
  }
});

// Fetch Profile ↓
app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (error, user) => {
      if (error) throw error;
      const { name, email, _id } = await UserModel.findById(user.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});

// Logout Profile ↓
app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

// For Adding Places ↓
app.post("/places", (req, res) => {
  const { token } = req.cookies;
  const {
    title,
    address,
    addedPhoto,
    description,
    extraInfo,
    checkIn,
    checkOut,
    maxGuest,
    perks,
    price,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (error, user) => {
    if (error) throw error;
    // storing the places data
    const places = await PlaceModel.create({
      owner: user.id,
      title,
      address,
      photos: addedPhoto,
      description,
      extraInfo,
      checkIn,
      checkOut,
      maxGuest,
      perks,
      price,
    });
    res.json(places);
  });
});

// For Fetching All Places at index page
app.get("/places", async (req, res) => {
  res.json(await PlaceModel.find());
});

// For Fetching All Places of a particular user ↓
app.get("/user-places", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (error, user) => {
    const { id } = user;
    res.json(await PlaceModel.find({ owner: id }));
  });
});

app.get("/places/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await PlaceModel.findById(id));
});

// For Fetching Particular Place with it's id
app.put("/places", async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    addedPhoto,
    description,
    extraInfo,
    checkIn,
    checkOut,
    maxGuest,
    perks,
    price,
  } = req.body;

  jwt.verify(token, jwtSecret, {}, async (error, userData) => {
    const places = await PlaceModel.findById(id);
    if (userData.id === places.owner.toString()) {
      places.set({
        title,
        address,
        photos: addedPhoto,
        description,
        extraInfo,
        checkIn,
        checkOut,
        maxGuest,
        perks,
        price,
      });
      await places.save();
      res.json("ok");
    }
  });
});

// For Uploading Photos using Link ↓
app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;

  // re-naming the image ↓
  const today = new Date();
  const datePart = today.toISOString().slice(0, 10);
  const timePart = today.toTimeString().slice(0, 8).replace(/:/g, ""); // Format: HHMMSS
  const newName = `photo_${datePart}_${timePart}.jpg`;

  await imageDownloader.image({
    url: link,

    dest: __dirname + "\\uploads\\" + newName,
  });
  res.json(newName);
});

// For uploading photos from device ↓

const photosMiddleware = multer({ dest: "uploads" });

app.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
  const uploadedFiles = [];

  for (let i = 0; i < req.files.length; i++) {
    const file = req.files[i];
    const parts = file.originalname.split(".");
    const ext = parts.pop(); // Extracting the extension more safely
    const newName = `${file.filename}.${ext}`; // Assuming multer's filename is unique enough
    const newPath = path.join(__dirname, "uploads", newName); // Correctly forming the new path
    const oldPath = path.join(__dirname, file.path); // Full path for the old file

    fs.renameSync(oldPath, newPath); // Correctly renaming the file

    uploadedFiles.push(newName); // Pushing the new name to the array to be returned
  }

  res.json(uploadedFiles);
});

// For booking
app.post("/bookings", async (req, res) => {
  const userData = await getUserDataFromReq(req);
  const { place, checkIn, checkOut, noOfGuests, name, phone, price } = req.body;
  BookingModel.create({
    place,
    checkIn,
    checkOut,
    noOfGuests,
    name,
    phone,
    price,
    user: userData.id,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((error) => {
      throw error;
    });
});

// For fetching all bookings of particular profile
app.get("/bookings", async (req, res) => {
  const userData = await getUserDataFromReq(req);
  res.json(await BookingModel.find({ user: userData.id }).populate("place"));
});

// const photosMiddleware = multer({ dest: "uploads" });

// app.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
//   const uploadedFiles = [];

//   for (let i = 0; i < req.files.length; i++) {
//     const { path, originalname } = req.files[i];
//     const parts = originalname.split(".");
//     const ext = parts[parts.length - 1];
//     const newPath = path.join(path, `${path}.${ext}`);
//     fs.renameSync(path, newPath);
//     uploadedFiles.push(newPath.replace("uploads\\", ""));
//   }
//   res.json(uploadedFiles);
// });

app.listen(4000);
console.log("running at http://localhost:4000");
