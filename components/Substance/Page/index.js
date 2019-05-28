import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo-hooks';
import { Flex, Box } from 'rebass';
import { position } from 'styled-system';
import styled from 'styled-components';
import Head from 'next/head';
import { adopt } from 'react-adopt';

import Container from '../../Container';
import GET_SUBSTANCE from './query';
import SubstancePageHeader from '../Header';
import SubstanceContent from '../Content';
import { FormattedMessage } from 'react-intl';
import SubstanceMeta from './Meta';

const StickyHeader = styled(Box).attrs(() => ({
  position: ['relative', null, 'sticky'],
}))`
  ${position}
  top: 0;
  height: 100%;
`;

const SubstancePage = ({ name }) => {
  const { data } = useQuery(GET_SUBSTANCE, { variables: { query: name } });
  if (data && data.substances && data.substances.length) {
    const substance = data.substances[0];
    return (
      <Container>
        <SubstanceMeta substance={substance} />
        <Flex flexWrap="wrap" m={[-2, -3, -4]}>
          <StickyHeader width={[1, null, 2 / 5, 1 / 3]} p={[2, 3, 4]}>
            <SubstancePageHeader substance={substance} />
          </StickyHeader>
          <Box flex="1" p={[2, 3, 4]}>
            <SubstanceContent substance={substance} />
          </Box>
        </Flex>
      </Container>
    );
  }
  return null;
};

SubstancePage.propTypes = {
  name: PropTypes.string.isRequired,
};

export default SubstancePage;
