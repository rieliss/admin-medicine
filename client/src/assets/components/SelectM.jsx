import React from "react";
import Select from "react-select";

const SelectM = ({ name, labelText, value, options, onChange }) => {
  const handleChange = (selectedOptions) => {
    const isSelectAll = selectedOptions.some(
      (option) => option.value === "selectAll"
    );

    if (isSelectAll) {
      onChange(options.map((option) => option.value));
    } else {
      onChange(selectedOptions.map((option) => option.value));
    }
  };

  const selectAllOption = { label: "Select All", value: "selectAll" };
  const formattedOptions = [
    selectAllOption,
    ...options.map((option) => ({
      value: option.value,
      label: option.label,
    })),
  ];

  const selectedValues = value.includes("selectAll")
    ? formattedOptions
    : formattedOptions.filter((option) => value.includes(option.value));

  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText}
      </label>
      <Select
        id={name}
        name={name}
        isMulti
        value={selectedValues}
        onChange={handleChange}
        options={formattedOptions}
        placeholder="Select..."
      />
    </div>
  );
};

export default SelectM;
