import React from "react";
import Wrapper from "../wrappers/PatientsContainer";
import { useAllPostureContext } from "../../pages/AllPosture";
import Posture from "./Posture";

const PostureContainer = () => {
  const { data } = useAllPostureContext();

  if (!data) {
    return (
      <Wrapper>
        <h2>Loading...</h2>
      </Wrapper>
    );
  }

  const { postures } = data;

  if (!postures || postures.length === 0) {
    return (
      <Wrapper>
        <h2>No postures to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <table>
        <thead>
          <tr>
            <th className="nopat">ท่าที่</th>
            <th>ชื่อท่ากายภาพ</th>
            <th className="mang">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {postures.map((posture) => {
            return <Posture key={posture._id} {...posture} />;
          })}
        </tbody>
      </table>
    </Wrapper>
  );
};

export default PostureContainer;
