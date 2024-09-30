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
  let imagePath = "";

  if (newCabin.image instanceof FileList) {
    const imageName = `${Math.random()}-${newCabin.image[0].name}`.replace(
      /\//g,
      ""
    );
    imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image[0]);
    if (storageError) {
      console.error(storageError);
      throw new Error("New image could not be uploaded");
    }
  } else {
    // no new image uploaded
    imagePath = newCabin.image;
  }

  const { data, error: createError } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();
  if (createError) {
    console.error("Cabin could not be created:", createError);
    throw new Error("Cabin could not be created");
  }

  return data;
}

export async function updateCabin(
  newCabin: Cabin,
  id: number
): Promise<Cabin[]> {
  let newImagePath = "";

  if (newCabin.image instanceof FileList) {
    const newImageName = `${Math.random()}-${newCabin.image[0].name}`.replace(
      /\//g,
      ""
    );
    newImagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${newImageName}`;
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(newImageName, newCabin.image[0]);
    // Delete cabin if the image was not uploaded successfully
    if (storageError) {
      console.error(storageError);
      throw new Error("New image could not be uploaded");
    }
  } else {
    // no new image uploaded
    newImagePath = newCabin.image;
  }

  const { data, error: updateError } = await supabase
    .from("cabins")
    .update([{ ...newCabin, image: newImagePath }])
    .eq("id", id)
    .select();
  if (updateError) {
    console.error("Cabin could not be updated:", updateError);
    throw new Error("Cabin could not be created");
  }

  return data;
}

export async function deleteCabin(id: number) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error("Error deleting cabin:", error);
  }
}
