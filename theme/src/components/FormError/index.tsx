// components/ValidationErrors.js

import { Box, Paper, Text } from '@mantine/core';

function index({ error }) {

  if (!error || !error.response?.data?.errors) {
    return null;
  }

  return (
    <Box style={{paddingBottom: 20 }}>
        <Text size="sm" weight={700} color="red">
        Whoops! Something went wrong.
        </Text>
        <Paper radius="md" style={{ borderLeft: '4px solid red', paddingLeft: 15} }>
            {Object.values(error?.response?.data?.errors)?.map((error, index) => (
                <Text key={index} size="sm" color="red" style={{ marginBottom: '0.25rem', display: 'block' }}>
                    {error}
                </Text>
            ))}        
        </Paper>
    </Box>
  );
}

export default index;
