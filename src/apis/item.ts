import axios from "axios";
import type { ItemProps } from "../types/item.type";

export async function apiGetItemByPort(idPelabuhan: number) {
  try {
    const filter = encodeURIComponent(
      JSON.stringify({ where: { id_pelabuhan: idPelabuhan } })
    );
    const url = `http://202.157.176.100:3001/barangs?filter=${filter}`;

    const res = await axios.get<ItemProps[]>(url);
    return res.data;
  } catch (err: any) {
    const errorMessage =
      err.response?.data?.message || err.message || "Terjadi kesalahan";
    console.error(errorMessage);
    return null;
  }
}
