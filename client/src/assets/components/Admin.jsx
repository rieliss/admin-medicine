import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link, Form } from "react-router-dom";
import Wrapper from "../wrappers/Posture";
import AdminInfo from "./AdminInfo";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

const Admin = ({ _id, name, createdAt }) => {
  const date = day(createdAt).format("MMM Do, YYYY");
  return (
    <tr>
      <td>{name}</td>
      <td>
        {/* <Link to={`../edit-admin/${_id}`} className="btn edit-btn">
          แก้ไข
        </Link> */}
        <Form method="post" action={`../delete-admin/${_id}`}>
          <button
            onClick={(e) =>
              window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบแอดมิน?")
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

export default Admin;
