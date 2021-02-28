import React, { ReactElement } from "react";
import { Row, Col } from "react-bootstrap";
import "./index.scss";
import avatar from "../../assets/images/avatar.png";
interface Props {}

export default function Header({}: Props): ReactElement {
  return (
    <div className="headerContainer">
      <Row>
        <Col xs={12} className="title">
          <img src={avatar} alt="header" width={250} height={250} />
        </Col>
      </Row>
    </div>
  );
}
