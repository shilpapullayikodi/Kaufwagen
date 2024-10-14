import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]"; // Adjust the path to your auth options
import dbConnect from "@/db/connect";
import Item from "../../../db/models/Item";
import SelectedItem from "../../../db/models/SelectedItem";

export default async function handler(request, response) {
  await dbConnect();

  const session = await getServerSession(request, response, authOptions);
  if (!session) {
    return response.status(401).json({ error: "Not authenticated" });
  }
  if (request.method === "GET") {
    const items = await Item.find(); // [{_id: 123, name: 'Apple', image: 'apple_url'}, {_id: 124, name: 'Orange', image: 'orange_url'}]

    const selectedItems = await SelectedItem.find({
      //find all the selected items which is having this user id
      userId: session.user.userId,
    }).populate("item"); //[{_id: 345645, item:{_id: 123, name: 'Apple', image: 'apple_url'}}]
    return response.status(200).json({
      items: items,
      selectedItems: selectedItems?.map((selectedItem) => selectedItem.item),
    });
  }

  if (request.method === "POST") {
    try {
      const { id, name } = request.body;

      if (id) {
        const existingItem = await SelectedItem.findOne({
          item: id,
          userId: session.user.userId,
        }); //search the database for a single document
        if (existingItem) {
          // remove from selectedItems item which is having this userid
          await SelectedItem.deleteOne({
            item: id,
            userId: session.user.userId,
          });
          response.status(201).json({ status: "item removed" });
        } else {
          console.log({ item: id, userId: session.user.userId });
          await SelectedItem.create({
            item: id,
            userId: session.user.userId,
          });
          response.status(201).json({ status: "item added." });
        }
      } else {
        const item = await Item.create({ name: name });
        await SelectedItem.create({
          item: item._id,
          userId: session.user.userId,
        });
        response.status(201).json({ status: "item added." });
      }
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  }
}
