import { Cabin } from "../types/cabin";
import supabase, { supabaseUrl } from "./supabase";

export async function getCabins(): Promise<Cabin[]> {
  const { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error("Error fetching cabins:", error);
    return [];
  }

  return cabins;
}

export async function createCabin(newCabin: Cabin): Promise<Cabin[]> {
  const imageName = `${Math.random()}-${newCabin.image[0].name}`.replace(
    /\//g,
    ""
  );
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create cabin
  const { data, error: createError } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();
  if (createError) {
    console.error("Cabin could not be created:", createError);
    throw new Error("Cabin could not be created");
  }

  // 2. Upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image[0]);
  // Delete cabin if the image was not uploaded successfully
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data[0].id);
    console.error(storageError);
    throw new Error("Cabin image could not be uploaded");
  }

  return data;
}

export async function deleteCabin(id: number) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error("Error deleting cabin:", error);
  }
}
