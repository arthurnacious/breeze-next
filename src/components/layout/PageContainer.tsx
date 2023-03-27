import React from "react";
import PropTypes from "prop-types";
import { Center, Container, Loader } from "@mantine/core";

PageContainer.propTypes = {
  isLoading: PropTypes.bool,
  pt: PropTypes.string,
  p: PropTypes.string || PropTypes.object,
  fluid: PropTypes.bool.isRequired,
};

PageContainer.defaultProps = {
  isLoading: false,
  pt: "lg",
  p: "sm",
  fluid: false,
};

function PageContainer({ isLoading, pt, p, fluid, children }) {
  
  return isLoading ?
    <Center>
      <Loader />
    </Center>
  :
   (
    <Container pt={pt} fluid={fluid} p={p}>
      {children}
    </Container>
  );
}

export default PageContainer;
