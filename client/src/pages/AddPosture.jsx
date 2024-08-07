import React, { useState } from "react";
import {
  FormRow,
  FormRowSelect,
  FormRowMultiSelect,
} from "../assets/components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import {
  CHOOSEPOSTURES,
  TYPEPOSTURES,
  TYPESTATUS,
} from "../../../utils/constants";
import {
  Form,
  redirect,
  useNavigation,
  useOutletContext,
} from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { Player } from "video-react";
import "video-react/dist/video-react.css";

const isIdPosturesDuplicate = async (noPostures) => {
  try {
    const response = await customFetch.get(
      `/postures?noPostures=${noPostures}`
    );
    return response.data.length > 0; // หากมีหมายเลขท่าที่ซ้ำกันอยู่ในฐานข้อมูล จะคืนค่า true
  } catch (error) {
    console.error("Error checking duplicate noPostures:", error);
    return false; // หากเกิดข้อผิดพลาดในการเชื่อมต่อกับ API หรือไม่พบข้อมูล จะคืนค่า false
  }
};

export const action = async ({ request }) => {
  try {
    const formData = new FormData();
    const data = await request.formData();
    const noPostures = data.get("noPostures");
    const namePostures = data.get("namePostures");
    const userType = data.get("userType");
    const Description = data.get("Description");
    const imageUrl = data.get("imageUrl");
    const videoUrl = data.get("videoUrl");

    // ตรวจสอบว่าหมายเลขผู้ป่วยซ้ำกันหรือไม่
    const isDuplicate = await isIdPosturesDuplicate(noPostures);
    if (isDuplicate) {
      toast.error("หมายเลขท่าซ้ำกัน โปรดเลือกหมายเลขอื่น");
      return null; // หยุดการส่งข้อมูลถ้าหมายเลขผู้ป่วยซ้ำกัน
    }

    // ตรวจสอบว่าหมายเลขผู้ป่วยเป็นตัวเลขหรือไม่
    if (!/^[0-9]+$/.test(noPostures)) {
      toast.error("หมายเลขท่าต้องเป็นตัวเลขเท่านั้น");
      return null; // หยุดการส่งข้อมูลถ้าหมายเลขผู้ป่วยไม่ใช่ตัวเลข
    }

    // เพิ่มข้อมูลจาก FormData ลงใน formData
    for (const [key, value] of data.entries()) {
      formData.append(key, value);
    }

    const postureData = {
      noPostures: noPostures,
      namePostures: namePostures,
      Description: Description,
      userType: userType,
      imageUrl: imageUrl,
      videoUrl: videoUrl,
    };

    console.log("Sending request:", postureData);
    await customFetch.post("/postures", postureData);
    toast.success("เพิ่มข้อมูลท่ากายภาพเรียบร้อยแล้ว");
    return redirect("/dashboard/all-posture");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AddPosture = () => {
  const { user } = useOutletContext();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [selectedUserType, setSelectedUserType] = useState(TYPEPOSTURES.TYPE_1);
  // const [selectedimageUrl, setImageUrl] = useState("");
  // const [selectedvideoUrl, setVideoUrl] = useState("");

  const handleUserTypeChange = (event) => {
    setSelectedUserType(event.target.value);
  };

  const [imgFile, setImgFile] = useState();
  const [videoFile, setVideoFile] = useState();

  const handleUpload = (e) => {
    console.log(file);
  };

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">เพิ่มท่ากายภาพ</h4>
        <div className="form-center">
          <FormRowSelect
            labelText="ชื่อประเภทของท่ากายภาพบำบัด"
            name="userType"
            value={selectedUserType}
            onChange={handleUserTypeChange}
            list={Object.values(TYPEPOSTURES)}
          />

          <FormRow
            type="text"
            name="noPostures"
            labelText="ท่าที่"
            pattern="[0-9]*"
          />

          <FormRow type="text" name="namePostures" labelText="ชื่อท่ากายภาพ" />

          <FormRow type="textarea" name="Description" labelText="รายละเอียด" />

          <div className="form-row">
            <label htmlFor="image" className="form-label">
              รูปภาพ
            </label>
            <div className="image-container">
              <input
                type="file"
                name="imageUrl"
                onClick={handleUpload}
                onChange={(e) =>
                  setImgFile(URL.createObjectURL(e.target.files[0]))
                }
              />
              <img src={imgFile} className="thumbnail" />
            </div>
          </div>

          
          <div className="form-row">
            <label htmlFor="video" className="form-label">
              วิดีโอ
            </label>
            <div className="video-container">
              <input
                type="file"
                name="videoUrl"
                onClick={handleUpload}
                onChange={(e) =>
                  setVideoFile(URL.createObjectURL(e.target.files[0]))
                }
              />
              {videoFile && (
                <Player src={videoFile} className="thumbnail-video" />
              )}
            </div>
          </div>

          {/* <div className="form-row">
            <label htmlFor="image" className="form-label">
              รูปภาพ
            </label>

            <input
              type="file"
              id="image"
              name="imageUrl"
              className="form-input"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          <div className="form-row">
            <label htmlFor="video" className="form-label">
              วิดีโอ
            </label>

            <input
              type="file"
              id="video"
              name="videoUrl"
              className="form-input"
              accept="video/*"
              onChange={handleVideoChange}
            />
          </div> */}

          <br />
          <button
            type="submit"
            className="btn btn-block form-btn "
            disabled={isSubmitting}
          >
            {isSubmitting ? "submitting..." : "submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddPosture;
