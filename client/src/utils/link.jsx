import React from "react";

import { IoBarChartSharp } from "react-icons/io5";
import { ImProfile } from "react-icons/im";
import { MdAdminPanelSettings } from "react-icons/md";
import { MdComment } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { IoMdPersonAdd } from "react-icons/io";
import { FaWalking } from "react-icons/fa";
import { AiFillDatabase } from "react-icons/ai";
import { IoPeopleSharp } from "react-icons/io5";


const links = [
  {
    text: "หน้าแรก",
    path: ".",
    icon: <IoBarChartSharp />,
  },
  // {
  //   text: "เพิ่มท่ากายภาพ",
  //   path: "add-posture",
  //   icon: <FaWalking />,
  // },
  {
    text: "จัดการกระทู้",
    path: "blogmanage",
    icon: <MdComment />,
  },
  {
    text: "จัดการท่ากายภาพ",
    path: "all-posture",
    icon: <AiFillDatabase />,
  },
  // {
  //   text: "เพิ่มข้อมูลคนไข้",
  //   path: "add-user",
  //   icon: <IoMdPersonAdd />,
  // },
  {
    text: "จัดการคนไข้",
    path: "all-patient",
    icon: <IoPeopleSharp />,
  },
  {
    text: "จัดการแพทย์",
    path: "all-doctor",
    icon: <IoPeopleSharp />,
  },
  {
    text: "จัดการแอดมิน",
    path: "all-admin",
    icon: <IoMdPersonAdd />,
  },
  // {
  //   text: "โปรไฟล์",
  //   path: "profile",
  //   icon: <ImProfile />,
  // },
  {
    text: "แอดมิน",
    path: "admin",
    icon: <MdAdminPanelSettings />,
  },
  // {
  //   text: "ออกจากระบบ",
  //   path: "admin",
  //   icon: <CiLogout />,
  // },
];

export default links;
