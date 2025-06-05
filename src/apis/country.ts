import axios from "axios";
import type { CountryProps } from "../types/country.type";

export async function apiGetCountries() {
  try {
    const url = `http://202.157.176.100:3001/negaras`;

    const res = await axios.get<CountryProps[]>(url);
    return res.data;
  } catch (err: any) {
    const errorMessage =
      err.response?.data?.message || err.message || "Terjadi kesalahan";
    console.error(errorMessage);
    return null;
  }
}
