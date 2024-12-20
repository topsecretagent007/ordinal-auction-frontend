import { BASE_URL } from "@/config/api";
import axios from "axios";
import { toast } from "react-toastify";

export async function getNftAuctionData(time: number) {
  try {
    const response = await axios.post(`${BASE_URL}/api/auctions`, { time: time });
    return response.data;
  } catch (error) {
    toast.error("Error fetching media:")
    throw error;
  }
}