import dbConnect from "@/db/connect";
import Item from "../../../db/models/Item";
import SelectedItem from "../../../db/models/SelectedItem";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const items = await Item.find(); // [{_id: 123, name: 'Apple', image: 'apple_url'}, {_id: 124, name: 'Orange', image: 'orange_url'}]
    const selectedItems = await SelectedItem.find().populate("item"); //[{_id: 345645, item:{_id: 123, name: 'Apple', image: 'apple_url'}}]
    return response.status(200).json({
      items: items,
      selectedItems: selectedItems?.map((selectedItem) => selectedItem.item), //extract items objects from selectedItems collection
    });
  }

  if (request.method === "POST") {
    try {
      const itemId = request.body;
      const existingItem = await SelectedItem.findOne({ item: itemId }); //search the database for a single document
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
  }
}
