import { Cabin } from "../types/cabin";
import supabase from "./supabase";

export async function getCabins(): Promise<Cabin[]> {
  const { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error("Error fetching cabins:", error);
    return [];
  }

  return cabins;
}

export async function deleteCabin(id: number) {
  const { error } = await supabase
    .from("cabins")
    .delete()
    .eq("some_column", id);

  if (error) {
    console.error("Error deleting cabin:", error);
    return null;
  }
}
