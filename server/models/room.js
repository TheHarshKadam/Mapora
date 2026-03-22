import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  playerId: String, // socket.id
  name: String,
  guesses: [
    {
      country: String,
      distance: Number,
    },
  ],
  joinedAt: {
    type: Date,
    default: Date.now,
  },
});

const roomSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
    unique: true,
  },

  mode: {
    type: String,
    enum: ["single", "multi"],
    default: "single",
  },

  players: [playerSchema],

  targetCountry: {
    type: String,
  },

  status: {
    type: String,
    enum: ["waiting", "playing", "finished"],
    default: "waiting",
  },

  guesses: [
    {
      country: String,
      distance: Number,
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Room = mongoose.model("Room", roomSchema);

export default Room;