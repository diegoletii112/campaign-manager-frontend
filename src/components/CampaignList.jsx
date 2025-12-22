import { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { getCampaigns, deleteCampaign, updateCampaignStatus } from '../services/api'; 

const CampaignList = ({ refreshTrigger, onAction }) => {
    const [campaigns, setCampaigns] = useState([]);

    const fetchCampaigns = async () => {
        try {
            const body = await getCampaigns();
            setCampaigns(body);
        } catch (error) {
            console.error("Could not fetch campaigns", error);
        }
    };

    useEffect(() => {
        fetchCampaigns();
    }, [refreshTrigger]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            await deleteCampaign(id);
            if (onAction) onAction();
            alert("Campaign deleted.");
        } catch (error) {
            alert("Delete failed.");
        }
    };

    const handleToggleStatus = async (campaign) => {
        try {
            const newStatus = campaign.status === 'ON' ? 'OFF' : 'ON';
            await updateCampaignStatus(campaign.id, newStatus);
            if (onAction) onAction();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Grid container spacing={2} sx={{ mt: 2 }}>
            {campaigns.map((campaign) => (
                <Grid item xs={12} sm={6} md={4} key={campaign.id}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <CardContent>
                            <Typography variant="h5">Name: {campaign.name}</Typography>
                            <Typography color="text.secondary">Town: {campaign.townName}</Typography>
                            <Typography variant="body2">
                                Budget: {campaign.budget} | Bid: {campaign.bidAmount}<br />
                                Status: <strong>{campaign.status}</strong>
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ marginTop: 'auto', gap: 1 }}>
                            <Button size="small" variant="outlined" onClick={() => handleToggleStatus(campaign)}>
                                {campaign.status === 'ON' ? 'Turn Off' : 'Turn On'}
                            </Button>
                            <Button size="small" color="error" onClick={() => handleDelete(campaign.id)}>
                                Delete
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default CampaignList;