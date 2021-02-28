import "./index.scss";

import React, { ReactElement, useState } from "react";
import { Col, Form, ListGroup, Row } from "react-bootstrap";
import Option from "../interfaces/Option";
import Select from "react-select";
import { ValueType } from "react-select/lib/types";

interface SearchBarProps {
  placeholder?: string;
  value?: Option;
  options: Option[];
  onChange?: (option: Option) => void;
}

export default function SearchBar({
  value,
  options,
  placeholder = "Please select an option",
  onChange,
}: SearchBarProps): ReactElement {
  const [selected, setSelected] = useState(value || []);
  const handleChange = (option: ValueType<Option>) => {
    const val = option as Option;
    console.log(val);
    setSelected(val);
    onChange && onChange(val);
  };

  return (
    <Row className="searchBarContainer">
      <Col xs={12}>
        <Select<Option>
          value={selected}
          placeholder={placeholder}
          getOptionLabel={(option: Option) => option.label}
          getOptionValue={(option: Option) => option.value}
          options={options}
          isClearable={true}
          isSearchable={true}
          backspaceRemovesValue={true}
          onChange={handleChange}
        />
        Tinshu
      </Col>
    </Row>
  );
}
