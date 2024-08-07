import { StatusCodes } from "http-status-codes";
import Posture from "../models/PostureModel.js";
import { NotFoundError } from "../errors/customError.js";

export const getAllPosture = async (req, res) => {
    const { search, userType, sort, isDeleted } = req.query;
    console.log(isDeleted);

    const queryObject = {};
    if (typeof isDeleted !== "undefined") {
        queryObject.isDeleted = isDeleted === "true";
    } else {
        queryObject.isDeleted = { $nin: [true] };
    }
    if (search) {
        queryObject.$or = [
            { namePostures: { $regex: search, $options: "i" } },
            { noPostures: { $regex: search, $options: "i" } },
        ];
    }

    if (userType && userType !== "all") {
        queryObject.userType = userType;
    }

    const sortOptions = {
        newest: "-createdAt",
        oldest: "createdAt",
        "a-z": "-namePostures",
        "z-a": "namePostures",
    };

    const sortKey = sortOptions[sort] || sortOptions.newest;

    // Pagination logic remains the same
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const postures = await Posture.find(queryObject)
        .sort(sortKey)
        .skip(skip)
        .limit(limit);

    const totalPostures = await Posture.countDocuments(queryObject);
    const numOfPages = Math.ceil(totalPostures / limit);
    res.status(StatusCodes.OK).json({
        totalPostures,
        numOfPages,
        currentPage: page,
        postures,
    });
};

// export const getAllPosture = async (req, res) => {
//     const { search, userType, sort } = req.query;

//     const queryObject = {};
//     if (search) {
//         queryObject.$or = [
//             { namePostures: { $regex: search, $options: "i" } },
//             { noPostures: { $regex: search, $options: "i" } },
//         ];
//     }

//     if (userType && userType !== "all") {
//         queryObject.userType = userType;
//     }

//     const sortOptions = {
//         newest: "-createdAt",
//         oldest: "createdAt",
//         "a-z": "-namePostures",
//         "z-a": "namePostures",
//     };

//     const sortKey = sortOptions[sort] || sortOptions.newest;

//     // แบ่งหน้า

//     const page = Number(req.query.page) || 1;
//     const limit = Number(req.query.limit) || 10;
//     const skip = (page - 1) * limit;

//     const postures = await Posture.find(queryObject)
//         .sort(sortKey)
//         .skip(skip)
//         .limit(limit); // ลบ { createdBy: req.user.userId } เพื่อค้นหาข้อมูลทั้งหมด
//     const totalPostures = await Posture.countDocuments(queryObject);
//     const numOfPages = Math.ceil(totalPostures / limit);
//     res.status(StatusCodes.OK).json({
//         totalPostures,
//         numOfPages,
//         currentPage: page,
//         postures,
//     });
// };

export const createPosture = async (req, res) => {
    const { noPostures } = req.body;

    const existingPosture = await Posture.findOne({ noPostures });
    if (existingPosture) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: "noPostures already exists" });
    }
    // If noPostures does not exist, proceed to create new posture
    req.body.createdBy = req.user.userId;
    const postureuser = await Posture.create(req.body);
    res.status(StatusCodes.CREATED).json({ postureuser });
};

export const getPosture = async (req, res) => {
    const posture = await Posture.findById(req.params._id);
    if (!posture) throw new NotFoundError(`no patient with id : ${_id}`);
    res.status(StatusCodes.OK).json({ posture });
};

export const updatePosture = async (req, res) => {
    const updatedPosture = await Posture.findByIdAndUpdate(
        req.params._id,
        req.body,
        {
            new: true,
        }
    );

    if (!updatedPosture)
        throw new NotFoundError(`no posture with id : ${req.params._id}`);

    res.status(StatusCodes.OK).json({ posture: updatedPosture });
};

// export const deletePosture = async (req, res) => {
//     const removedPosture = await Posture.findByIdAndDelete(req.params._id);

//     if (!removedPosture) throw new NotFoundError(`no posture with id : ${_id}`);
//     res.status(StatusCodes.OK).json({ posture: removedPosture });
// };

export const deletePosture = async (req, res) => {
    const { _id } = req.params;

    try {
        const updatedPosture = await Posture.findByIdAndUpdate(
            _id,
            { isDeleted: true },
            { new: true }
        );

        if (!updatedPosture) {
            throw new NotFoundError(`no posture with id : ${_id}`);
        }

        res.status(StatusCodes.OK).json({ posture: updatedPosture });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
};
