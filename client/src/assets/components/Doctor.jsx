import {
  FaLocationArrow,
  FaBriefcase,
  FaCalendarAlt,
  FaRegEdit,
} from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link, Form } from "react-router-dom";
import Wrapper from "../wrappers/Posture";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

const Doctor = ({ _id, doctorPrefix, nameDoctors, createdAt }) => {
  const date = day(createdAt).format("MMM Do, YYYY");
  return (
    <tr>
      <td>{doctorPrefix}</td>
      <td>{nameDoctors}</td>
      <td>
        <Link to={`../edit-doctor/${_id}`} className="btn edit-btn">
          <FaRegEdit />
        </Link>
        <Form method="post" action={`../delete-doctor/${_id}`}>
          <button
            onClick={(e) =>
              window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบแพทย์?")
                ? someHandler(e)
                : e.preventDefault()
            }
            type="submit"
            className="btn delete-btn"
          >
            <MdDelete />
          </button>
        </Form>
      </td>
    </tr>
  );
};

export default Doctor;
