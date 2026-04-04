import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/game",
});

export const startGameAPI = () => API.post("/start");

export const makeGuessAPI = (countryName) =>
  API.post("/guess", { countryName });

export const revealAnswerAPI = () => API.post("/reveal");