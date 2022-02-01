import mongoose from "mongoose";

const contanctSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    contanttype: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Contanct = mongoose.model('Contanct', contanctSchema)

export default Contanct
