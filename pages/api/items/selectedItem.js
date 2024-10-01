import SelectedItem from "../../../db/models/SelectedItem";
import dbConnect from "@/db/connect";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "POST") {
    try {
      const itemId = request.body;
      const existingItem = await SelectedItem.findOne({ item: itemId });
      if (existingItem) {
        // remove from selectedItems if the item already exists
        await SelectedItem.deleteOne({ item: itemId });
        response.status(201).json({ status: "item removed" });
      } else {
        await SelectedItem.create({ item: itemId });
        response.status(201).json({ status: "item added." });
      }
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  } else if (request.method === "GET") {
    //populating to get the all other details , item is id refers to Item collection
    const selectedItems = await SelectedItem.find().populate("item");
    response.status(200).json({ selectedItems });
    console.log("selected from database", selectedItems);
  }
}
// Todo: Find is selectedItem is present in DB for same itemID
// if there is an item
// delete the record
// else create
