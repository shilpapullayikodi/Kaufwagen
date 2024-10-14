import mongoose from "mongoose";
const { Schema } = mongoose;
const itemSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: false },
  category: { type: String, required: false },
});

const Item = mongoose.models.Item || mongoose.model("Item", itemSchema); //model with the name "Item" has already been compiled or not

export default Item;
