import React, { useEffect, useState } from "react";
import Select, { components, MultiValue, ActionMeta } from "react-select";
import Wrapper from "../wrappers/FormRowMultiSelect";

type OptionType = {
  value: string;
  label: string;
};

type SelectMultiFunctionProps = {
  name: string;
  labelText?: string;
  options: string[];
  onChange?: (selected: string[]) => void;
  defaultValue?: string[];
};

const SelectMultiFunction: React.FC<SelectMultiFunctionProps> = ({
  name,
  labelText,
  options,
  onChange,
  defaultValue = [],
}) => {
  const formattedOptions: OptionType[] = options.map((option) => ({
    value: option,
    label: option,
  }));

  const [selectedPostures, setSelectedPostures] = useState<OptionType[]>(
    defaultValue.map((value) => ({
      value,
      label: value,
    }))
  );

  const isOptionAllSelected = (selectedOptions: MultiValue<OptionType>) => {
    return selectedOptions.some((option) => option.value === "ท่าทั้งหมด");
  };

  const handleSelectChange = (
    newValue: MultiValue<OptionType>,
    actionMeta: ActionMeta<OptionType>
  ) => {
    console.log("newValue", newValue, "actionMeta", actionMeta);

    let updatedSelectedPostures: OptionType[];

    if (isOptionAllSelected(newValue)) {
      if (newValue.length === 1 || newValue.length === options.length) {
        updatedSelectedPostures = formattedOptions;
      } else {
        updatedSelectedPostures = [];
      }
    } else {
      updatedSelectedPostures = [...newValue];
    }

    setSelectedPostures(updatedSelectedPostures);

    if (onChange) {
      onChange(updatedSelectedPostures.map((option) => option.value));
    }
  };

  const Option = (props: any) => {
    return (
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    );
  };

  return (
    <Wrapper>
      <div className="form-row">
        <label htmlFor={name} className="form-label">
          {labelText || name}
        </label>
        <Select
          id={name}
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          components={{ Option }}
          onChange={handleSelectChange}
          options={formattedOptions}
          value={selectedPostures}
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </div>
    </Wrapper>
  );
};

export default SelectMultiFunction;
