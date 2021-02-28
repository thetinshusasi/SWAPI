import React, { ReactElement } from "react";
import { Col, Row } from "react-bootstrap";
import "./index.scss";

interface CardFrontProps {
  name: string;
  src?: string;
}

export default function CardFront({ name, src }: CardFrontProps): ReactElement {
  const style: React.CSSProperties = {
    backgroundImage: `url(${src})`,
  };
  return (
    <div className="front" style={style}>
      <div className="inner">
        <h2>{name}</h2>

        <label htmlFor="card1" className="button" aria-hidden="true">
          Details
        </label>
      </div>
    </div>
  );
}
