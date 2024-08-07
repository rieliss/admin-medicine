import React, { useEffect, useState } from "react";
import Wrapper from "../wrappers/PatientsContainer";
import { RiHistoryLine } from "react-icons/ri";
import customFetch from "../../utils/customFetch";
import { useNavigate } from "react-router-dom";

const DeletedDoctor = () => {
  const [deletedDoctors, setDeletedDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await customFetch.get("/doctors?isDeleted=true");
        console.log(res.data);
        setDeletedDoctors(res.data.doctors);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDoctors();
  }, []);

  const handleRecoverDoctor = async (doctorId) => {
    try {
      const res = await customFetch.patch(`/doctors/${doctorId}`, {
        isDeleted: false,
      });
      if (res.status === 200) {
        // Check for successful response
        const updatedDoctors = deletedDoctors.filter(
          (doctor) => doctor._id !== doctorId
        );
        setDeletedDoctors(updatedDoctors);
        navigate("/dashboard/all-doctor"); // Redirect after successful recovery
      } else {
        console.error("Error recovering doctor:", res.statusText);
      }
    } catch (error) {
      console.error("Error recovering doctor:", error);
    }
  };

    return (
    <Wrapper>
      <table>
        <thead>
          <tr>
            <th className="nopat">คำนำหน้า</th>
            <th>ชื่อ-นามสกุล</th>
            <th className="mang">กู้คืน</th>
          </tr>
        </thead>

          {deletedDoctors.map((doctor) => {
            return (
              <tbody key={doctor._id}>
                <td>{doctor.doctorPrefix}</td>
                <td>{doctor.nameDoctors}</td>
                <td>
                  <button
                    type="button"
                    className="btn delete-btn"
                    onClick={() => {
                      if (
                        window.confirm(
                          "คุณแน่ใจหรือไม่ว่าต้องการกู้คืนรายการนี้?"
                        )
                      ) {
                        handleRecoverDoctor(doctor._id);
                      }
                    }}
                  >
                    <RiHistoryLine />
                  </button>
                </td>
              </tbody>
            );
        })}
      </table>
    </Wrapper>
  );
};

export default DeletedDoctor;
