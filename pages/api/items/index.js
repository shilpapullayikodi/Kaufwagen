import dbConnect from "@/db/connect";
import Item from "../../../db/models/Item";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const items = await Item.find();
    return response.status(200).json(items);
  }
}
