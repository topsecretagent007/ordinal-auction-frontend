import { BASE_URL } from "@/config/api";
import axios from "axios";
import { toast } from "react-toastify";

export async function getCurrentBtcPrice() {
    try {
        const response = await axios.get(`${BASE_URL}/api/auctions/bitcoin-price`);
        return response.data;
    } catch (error) {
        toast.error("Error fetching media:")
        throw error;
    }
}