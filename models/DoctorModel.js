import mongoose from "mongoose";
import { PREFIXDOCTOR } from "../utils/constants.js";

const DoctorSchema = new mongoose.Schema(
  {
    doctorPrefix: {
      type: String,
      enum: Object.values(PREFIXDOCTOR),
      default: PREFIXDOCTOR.PF_MD1,
    },
    nameDoctors: String,
    noDoctors: String,
    tel: String,
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Doctor", DoctorSchema);
