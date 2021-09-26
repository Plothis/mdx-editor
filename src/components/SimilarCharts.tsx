import React, { useState } from 'react';

import styled from 'styled-components';

const Container = styled.div`
  position: relative;
`;

export const SimilarCharts: React.FC = ({ children }) => {
  return (
    <Container>
      相似图表，此处会自动识别
    </Container>
  );
};