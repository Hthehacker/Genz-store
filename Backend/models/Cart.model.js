import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    ProductId: {
        type: String,
        required: true

    },
    Quantity: {
        type: Number,
        min: 1,
        default: 1
    }

}, { timestamps: true })

export default mongoose.model("Cart", cartSchema);

