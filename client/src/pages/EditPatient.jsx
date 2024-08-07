import React, { useState, useEffect } from "react";
import { FormRow, FormRowSelect, SelectM } from "../assets/components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useLoaderData, useNavigate, redirect } from "react-router-dom";
import {
  TYPEPOSTURES,
  CHOOSEPOSTURES,
  TYPESTATUS,
  GENDER,
} from "../../../utils/constants";
import { Form } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const loader = async ({ params }) => {
  try {
    const { _id } = params;
    if (!_id) {
      throw new Error("Invalid ID");
    }
    const { data } = await customFetch.get(`/allusers/${_id}`);
    return data;
  } catch (error) {
    toast.error(error.response.data.msg);
    return redirect("/dashboard/all-patient");
  }
};

export const action = async ({ request, params }) => {
  const { _id } = params;
  const formData = await request.formData();

  const data = {};

  formData.forEach((value, key) => {
    if (key === "userPosts") {
      if (!data[key]) data[key] = [];
      data[key].push(value);
    } else {
      data[key] = value;
    }
  });

  if (data.userPosts) {
    data.userPosts = Array.from(new Set(data.userPosts));
  }

  try {
    if (!_id) {
      throw new Error("Invalid ID");
    }
    await customFetch.patch(`/allusers/${_id}`, data);
    toast.success("แก้ไขข้อมูลคนไข้เรียบร้อยแล้ว");
    return redirect("/dashboard/all-patient");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const EditPatient = () => {
  const { patient } = useLoaderData();
  const navigation = useNavigate();
  const isSubmitting = navigation.state === "submitting";

  const [selectedUserGender, setSelectedUserGender] = useState(
    patient.userGender || ""
  );
  const [selectedUserType, setSelectedUserType] = useState(
    patient.userType || ""
  );
  const [selectedUserPosts, setSelectedUserPosts] = useState(
    patient.userPosts || []
  );
  const [selectedUserStatus, setSelectedUserStatus] = useState(
    patient.userStatus || ""
  );
  const [postures, setPostures] = useState([]);

  useEffect(() => {
    const fetchPostures = async () => {
      try {
        const { data } = await customFetch.get("/postures");
        setPostures(data.postures);
      } catch (error) {
        toast.error(error?.response?.data?.msg);
      }
    };
    fetchPostures();
  }, []);

  const handleUserTypeChange = (event) => {
    setSelectedUserGender(event.target.value);
    setSelectedUserType(event.target.value);
    setSelectedUserStatus(event.target.value);
  };

  const handleUserPostsChange = (selectedOptions) => {
    setSelectedUserPosts(selectedOptions || []);
  };

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">แก้ไขข้อมูลคนไข้</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="idNumber"
            labelText="หมายเลขบัตรประชาชน"
            pattern="[0-9]*"
            defaultValue={patient.idNumber}
          />
          <FormRow
            type="text"
            name="idPatient"
            labelText="หมายเลขผู้ป่วย"
            pattern="[0-9]*"
            defaultValue={patient.idPatient}
          />
          <FormRow
            type="text"
            name="namePatient"
            labelText="ชื่อผู้ป่วย"
            defaultValue={patient.namePatient}
          />

          <FormRowSelect
            labelText="เพศ"
            name="userGender"
            value={selectedUserGender}
            onChange={handleUserTypeChange}
            list={Object.values(GENDER)}
            defaultValue={patient.userGender}
          />

          <FormRowSelect
            labelText="ชื่อประเภทของท่ากายภาพบำบัด"
            name="userType"
            value={selectedUserType}
            onChange={handleUserTypeChange}
            list={Object.values(TYPEPOSTURES)}
            defaultValue={patient.userType}
          />

          <FormRowSelect
            labelText="เลือกสถานะปัจจุบันของคนไข้"
            name="userStatus"
            value={selectedUserStatus}
            onChange={handleUserTypeChange}
            list={Object.values(TYPESTATUS)}
            defaultValue={patient.userStatus}
          />

          <SelectM
            name="userPosts"
            labelText="เลือกท่ากายภาพบำบัด"
            value={selectedUserPosts}
            options={[...CHOOSEPOSTURES.map((p) => ({ label: p, value: p }))]}
            onChange={handleUserPostsChange}
          />
          <button
            type="submit"
            className="btn btn-block form-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "submitting..." : "submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditPatient;
