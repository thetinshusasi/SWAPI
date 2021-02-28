import React, { useContext, useEffect, useState, useCallback } from "react";
import { Col, Container, Row, Accordion } from "react-bootstrap";
import Card from "../components/card";
import SearchBar from "../components/searchBar";
import Option from "../components/interfaces/Option";
import "./index.scss";
import AwaitLoading from "../components/awaitLoading";
import { SWAPIContext } from "../Providers/swAPIProvider";
import { getOptionsFromSwNames } from "../helpers/utils";
export interface IHomeProps {}
const imagesFolderPathPrefix = `/swCharacters`;
export default function Home(props: IHomeProps) {
  const {
    namesLoading,
    namesError,
    names,
    getSWNames,
    personLoading,
    personError,
    person,
    getSWByID,
  } = useContext(SWAPIContext);
  const [id, setId] = useState(undefined);

  const [options, setOptions] = useState(
    (names && getOptionsFromSwNames(names)) || undefined
  );

  useEffect(() => {
    if (!names) getSWNames && getSWNames();
  }, []);

  useEffect(() => {
    setOptions((names && getOptionsFromSwNames(names)) || undefined);
  }, [names]);

  const onSelectHandler = (selectedItem: Option) => {
    if (!selectedItem) return;
    setId(selectedItem.value);
    getSWByID && getSWByID(`${selectedItem.value}`);
  };

  const searchBarTag =
    (options && (
      <SearchBar
        placeholder="Please search by name or id"
        options={options}
        onChange={onSelectHandler}
      />
    )) ||
    null;

  return (
    <React.Fragment>
      <Container fluid className="homeContainer">
        <Row>
          <Col xs={{ span: 8, offset: 2 }} className="center">
            <AwaitLoading loading={namesLoading} error={namesError}>
              {searchBarTag}
            </AwaitLoading>
          </Col>
        </Row>
        <AwaitLoading loading={personLoading} error={personError}>
          {person && (
            <Row>
              <Col xs={12}>
                <Card src={`${imagesFolderPathPrefix}/${id}.jpg`} {...person} />
              </Col>
            </Row>
          )}
        </AwaitLoading>
      </Container>
    </React.Fragment>
  );
}
