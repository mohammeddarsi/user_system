import mongoose from "mongoose";

const auditSchema = new mongoose.Schema(
  {
    action: { type: String, required: true },
    details: { type: String },
    actBy: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  { timestamps: true },
);

export default mongoose.model("Audit", auditSchema);
