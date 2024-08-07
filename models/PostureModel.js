import mongoose from "mongoose";
import { TYPEPOSTURES } from "../utils/constants.js";

const PostureSchema = new mongoose.Schema(
    {
        userType: {
            type: String,
            enum: Object.values(TYPEPOSTURES),
            default: TYPEPOSTURES.TYPE_1,
        },
        namePostures: String,
        noPostures: String,
        Description: String,
        imageUrl: String,
        videoUrl: String,
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

export default mongoose.model("Posture", PostureSchema);

// import mongoose from "mongoose";
// import { TYPEPOSTURES } from "../utils/constants.js";

// const PostureSchema = new mongoose.Schema(
//   {
//     userType: {
//       type: String,
//       enum: Object.values(TYPEPOSTURES),
//       default: TYPEPOSTURES.TYPE_1,
//     },
//     namePostures: String,
//     noPostures: String,
//     Description: String,
//     imageUrl: String,
//     videoUrl: String,
//     createdBy: {
//       type: mongoose.Types.ObjectId,
//       ref: "User",
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Posture", PostureSchema);
