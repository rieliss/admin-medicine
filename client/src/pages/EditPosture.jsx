import React, { useState } from 'react';
import { FormRow, FormRowSelect } from '../assets/components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useLoaderData, useParams } from 'react-router-dom';
import { TYPEPOSTURES } from '../../../utils/constants';
import { Form, useNavigate, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

export const loader = async ({ params }) => {
  try {
    const { _id } = params;
    if (!_id) {
      throw new Error('Invalid ID');
    }
    const { data } = await customFetch.get(`/postures/${_id}`);
    return data;
  } catch (error) {
    toast.error(error.response.data.msg);
    return redirect('/dashboard/all-posture');
  }
};

export const action = async ({ request, params }) => {
  const { _id } = params;
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  // แปลงค่าที่เลือกจาก FormRowMultiSelect เป็นอาร์เรย์ของสตริง
  // if (data.userPosts) {
  //   data.userPosts = data.userPosts.split(",").map((item) => item.trim());
  // }

  try {
    if (!_id) {
      throw new Error('Invalid ID');
    }
    await customFetch.patch(`/postures/${_id}`, data);
    toast.success('แก้ไขข้อมูลท่ากายภาพเรียบร้อยแล้ว');
    return redirect('/dashboard/all-posture');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const EditPosture = () => {
  const { posture } = useLoaderData();

  const navigation = useNavigate();
  const isSubmitting = navigation.state === 'submitting';
  const [selectedUserType, setSelectedUserType] = useState(
    posture.userType || ''
  );

  const handleUserTypeChange = (event) => {
    setSelectedUserType(event.target.value);
    setSelectedUserStatus(event.target.value);
  };

  const [file, setFile] = useState();

  const handleUpload = (e) => {
    console.log(file);
  };

  console.log('posture', posture);

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>แก้ไขข้อมูลท่ากายภาพ</h4>
        <div className='form-center'>
          <FormRowSelect
            labelText='ชื่อประเภทของท่ากายภาพบำบัด'
            name='userType'
            value={selectedUserType}
            onChange={handleUserTypeChange}
            list={Object.values(TYPEPOSTURES)}
            defaultValue={posture.userType}
          />

          <FormRow
            type='text'
            name='noPostures'
            labelText='ท่าที่'
            pattern='[0-9]*'
            defaultValue={posture.noPostures}
          />

          <FormRow
            type='text'
            name='namePostures'
            labelText='ชื่อท่ากายภาพ'
            defaultValue={posture.namePostures}
          />

          <FormRow
            type='textarea'
            name='Description'
            labelText='รายละเอียด'
            defaultValue={posture.Description}
          />

          <div className='form-row'>
            <label htmlFor='image' className='form-label'>
              รูปภาพ
            </label>

            <input
              type='file'
              name='imageUrl'
              onClick={handleUpload}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          <div className='form-row'>
            <label htmlFor='video' className='form-label'>
              วิดีโอ
            </label>

            <input
              type='file'
              name='videoUrl'
              onClick={handleUpload}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          <br />
          <button
            type='submit'
            className='btn btn-block form-btn '
            disabled={isSubmitting}
          >
            {isSubmitting ? 'submitting...' : 'submit'}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};
export default EditPosture;
