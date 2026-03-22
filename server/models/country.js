import mongoose from "mongoose";

const countrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
  neighbors: [
    {
      type: String,
    },
  ],
});

const Country = mongoose.model("Country", countrySchema);

export default Country;