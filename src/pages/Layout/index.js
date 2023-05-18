import React, { Container } from "react-bootstrap";
import CustomNavbar from "../../components/CustomNavbar";

function Layout({ children }) {
  return (
    <>
      <CustomNavbar />
      <Container>{children}</Container>
    </>
  );
}

export default { Layout };
