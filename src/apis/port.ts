import axios from "axios";
import type { PortProps } from "../types/port.type";

export async function apiGetPortByCountry(idNegara: number) {
  try {
    const filter = encodeURIComponent(
      JSON.stringify({ where: { id_negara: idNegara } })
    );
    const url = `http://202.157.176.100:3001/pelabuhans?filter=${filter}`;

    const res = await axios.get<PortProps[]>(url);
    return res.data;
  } catch (err: any) {
    const errorMessage =
      err.response?.data?.message || err.message || "Terjadi kesalahan";
    console.error(errorMessage);
    return null;
  }
}
