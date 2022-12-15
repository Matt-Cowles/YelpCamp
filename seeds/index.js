const mongoose = require("mongoose");
const cities = require("./cities");
const Campground = require("../models/campground");
const { descriptors, places } = require("./seedHelpers");
const { createApi } = require("unsplash-js");
const e = require("express");
const axios = require("axios").default;

const seedImg = async () => {
  try {
    const img = await axios.get("https://api.unsplash.com/photos/random", {
      params: {
        client_id: "g29XbWFMtr1NaxqhIDBmcxTWietW2Ft6aCzNhB9WlEE",
        collections: 10489597,
        count: 1,
      },
    });
    console.log("Here is the img data! One sec as I generate it");
    console.log(img.data[0].urls.small);
    console.log("Done! Enjoy your new Images");
    return img.data[0].urls.small;
  } catch (e) {
    console.log("Encountered an error");
    console.log(e);
  }
};

async function main() {
  await mongoose.connect("mongodb://localhost:27017/yelp-camp");
}
main().then((data) => console.log("Connected"));
main().catch((err) => console.log("AN ERROR!", err));

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const camp = new Campground({
      author: "631505da6c824d684011b059",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      price: Math.floor(Math.random() * 50) + 10,
      geometry: {
        type: "Point",
        coordinates: [cities[random1000].longitude, cities[random1000].latitude],
      },
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea qui, corrupti omnis eum quaerat, aspernatur quia nesciunt odio, deleniti accusantium dicta. Maxime illum alias cumque.",
      images: [
        {
          url: "https://res.cloudinary.com/dfuw8n204/image/upload/v1671079544/YelpCamp/dave_hoefler_a3e7yEtQxJs_unsplash_e6c5581d-cdd7-44d0-b248-4f0917acf2f9_yfvlrj.jpg",
          filename: "YelpCamp/hgvtirh9vmtemuq7nxyl",
        },
        {
          url: "https://res.cloudinary.com/dfuw8n204/image/upload/v1671079645/YelpCamp/640px-Tent_camping_along_the_Sulayr_trail_in_La_Taha_2C_Sierra_Nevada_National_Park__28DSCF5147_29_qxsx3p.jpg",
          filename: "YelpCamp/njirba8gevsrxhikyi3o",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => mongoose.connection.close());
