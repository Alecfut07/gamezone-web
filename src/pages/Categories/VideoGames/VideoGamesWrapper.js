import React from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

function VideoGamesWrapper() {
  return (
    <Container>
      <Outlet />
    </Container>
  );
}

export default VideoGamesWrapper;
