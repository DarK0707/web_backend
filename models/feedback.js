import mongoose from "mongoose";

const feedbackSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const Feedback= mongoose.model('Feedback', feedbackSchema)

export default Feedback;
