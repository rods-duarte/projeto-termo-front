import axios from "axios";

const baseAPI = axios.create({
  baseURL: "https://app-termo.herokuapp.com/",
});

function getConfig(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

async function signup(signupData) {
  await baseAPI.post("/signup", signupData);
}

async function signin(signinData) {
  return baseAPI.post("/signin", signinData);
}

async function updateStats(id, token, stats) {
  return baseAPI.post(`/users/${id}`, stats, getConfig(token));
}

async function getGameData() {
  const response = await baseAPI.get("/game");
  return response.data;
}

export const api = {
  getConfig,
  signup,
  signin,
  getGameData,
  updateStats,
};
