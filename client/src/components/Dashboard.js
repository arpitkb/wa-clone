import React from "react";
import { Col, Row } from "react-bootstrap";
import Sidebar from "./Sidebar";
import { useConvos } from "../context/ConvoProvider";
import OpenConvo from "./OpenConvo";
const Dashboard = ({ id }) => {
  const { selectedConvo } = useConvos();

  return (
    <Row>
      <Col md={5} lg={5}>
        <Sidebar id={id} />
      </Col>
      {selectedConvo && (
        <Col md={7}>
          <OpenConvo />
        </Col>
      )}
    </Row>
  );
};

export default Dashboard;
