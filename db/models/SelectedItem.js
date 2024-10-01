import mongoose from "mongoose";
const { Schema } = mongoose;

const selectedItemSchema = new Schema({
  item: { type: Schema.Types.ObjectId, ref: "Item" },
});

const SelectedItem =
  mongoose.models.SelectedItem ||
  mongoose.model("SelectedItem", selectedItemSchema);

export default SelectedItem;
