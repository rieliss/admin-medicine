import React from "react";
import Wrapper from "../wrappers/PatientsContainer";
import { useAllDoctorContext } from "../../pages/AllDoctor";
import Doctor from "./Doctor";

const DoctorContainer = () => {
  const { data } = useAllDoctorContext();

  if (!data) {
    return (
      <Wrapper>
        <h2>Loading...</h2>
      </Wrapper>
    );
  }

  const { doctors } = data;

  if (!doctors || doctors.length === 0) {
    return (
      <Wrapper>
        <h2>No doctors to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <table>
        <thead>
          <tr>
            <th className="nopat">คำนำหน้า</th>
            <th>ชื่อ-นามสกุล</th>
            <th className="mang">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => {
            return <Doctor key={doctor._id} {...doctor} />;
          })}
        </tbody>
      </table>
    </Wrapper>
  );
};

export default DoctorContainer;
