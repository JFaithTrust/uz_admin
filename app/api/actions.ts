"use server"

import axios from "@/app/api/axios";
import {Job} from "@/types";
//
// import axios from "@/app/api/axios";
// import {toast} from "sonner";
//
// export async function login(values : any) {
//   try {
//     const { data } = await axios.post("/Auth/login", values);
//     return data
//   }catch (error) {
//     toast.error("An error occurred. Please try again.")
//   }
// }

export async function getJobs() : Promise<Job[]> {
  const { data } = await axios.get("/api");
  return data;
}