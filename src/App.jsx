import { useState } from 'react';
import { Container, Typography, CssBaseline, Box } from '@mui/material';
import EmeraldBalance from './components/AccountBalance';
import CampaignList from './components/CampaignList';
import CampaignForm from './components/CampaignForm';

function App() {
  const [refreshData, setRefreshData] = useState(false);

  const handleDataChange = () => {
    setRefreshData(prev => !prev); 
  };

  return (
    <>
      <CssBaseline /> 
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h3" align="center" gutterBottom color="primary" fontWeight="bold">
          Campaign Manager
        </Typography>
        <EmeraldBalance triggerRefresh={refreshData} />
        <CampaignForm onCampaignAdded={handleDataChange} />
        <Box sx={{ mt: 4 }}>
          <CampaignList refreshTrigger={refreshData} onAction={handleDataChange} />
        </Box>
      </Container>
    </>
  );
}

export default App;