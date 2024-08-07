import mongoose from "mongoose";
import { TYPEPOSTURES, CHOOSEPOSTURES, TYPESTATUS, GENDER } from "../utils/constants.js";

const PatientSchema = new mongoose.Schema(
  {
    idPatient: String,
    idNumber: String,
    namePatient: String,
    userGender: {
      type: String,
      enum: Object.values(GENDER),
      default: GENDER.GENDER_01,
    },
    userType: {
      type: String,
      enum: Object.values(TYPEPOSTURES),
      default: TYPEPOSTURES.TYPE_1,
    },
    userPosts: String,
    userStatus: {
      type: String,
      enum: Object.values(TYPESTATUS),
      default: TYPESTATUS.TYPE_ST1,
    },
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

export default mongoose.model("Patient", PatientSchema);
