import React from "react";
import { shallow } from "enzyme";
import Home from "./Home";
import AwaitLoading from "../components/awaitLoading";

describe("<Home />", () => {
  it("renders Home", () => {
    const component = shallow(<Home />);
    expect(component).toMatchSnapshot();
    expect(component.find(AwaitLoading).length).toEqual(2);
  });
});
