import axios from "axios";

const API_BASE_URL = "/";

async function getWallets() {
  try {
    let response = await axios.get("/api/wallet");
    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

export { getWallets };
