import { FormRow, FormRowSelect, SubmitBtn } from ".";
import Wrapper from "../wrappers/SearchContainer";
import { Form, useSubmit, Link } from "react-router-dom";
import {
  PREFIXDOCTOR,
  POSTURES_SORT_BY,
} from "../../../../utils/constants";
import { useAllDoctorContext } from "../../pages/AllDoctor";

const SearchDoctors = () => {
  const { searchValues } = useAllDoctorContext();
  // ให้ค่าเริ่มต้นเป็น object ว่างหรือค่าที่เหมาะสมหาก `searchValues` เป็น undefined
  const { search = "", doctorPrefix = "", sort = "" } = searchValues || {};
  const submit = useSubmit();

  const debounce = (onChange) => {
    let timeout;
    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(form);
      }, 2000);
    };
  };
  return (
    <Wrapper>
      <Form className="form">
        <div className="form-center">
          <FormRow
            labelText="ค้นหา"
            type="search"
            name="search"
            defaultValue={search}
            onChange={debounce((form) => {
              submit(form);
            })}
          />

          <FormRowSelect
            labelText="คำนำหน้าชื่อ"
            name="doctorPrefix"
            list={["all", ...Object.values(PREFIXDOCTOR)]}
            defaultValue={doctorPrefix}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />

          <FormRowSelect
            name="sort"
            defaultValue={sort}
            list={[...Object.values(POSTURES_SORT_BY)]}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
        </div>
      </Form>
    </Wrapper>
  );
};
export default SearchDoctors;