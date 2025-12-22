import { useState, useEffect } from 'react';
import { TextField, Button, Grid, MenuItem, Card, CardContent, Typography, Autocomplete } from '@mui/material';
import { createCampaign, getTowns, getKeywords } from '../services/api';

const CampaignForm = ({ onCampaignAdded }) => {
    const [towns, setTowns] = useState([]);
    const [availableKeywords, setAvailableKeywords] = useState([]);
    const [formData, setFormData] = useState({
        name: '', keywords: [], bidAmount: 0.01, budget: 20,
        status: 'ON', townName: '', radius: 0, emeraldAccountId: 1 
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [t, k] = await Promise.all([getTowns(), getKeywords()]);
                setTowns(t);
                setAvailableKeywords(k);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const isNumber = ['bidAmount', 'budget', 'radius'].includes(name);
        setFormData({
            ...formData,
            [name]: isNumber ? Math.max(0, parseFloat(value) || 0) : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createCampaign(formData);
            alert("The company has been created! 🎉");
            if (onCampaignAdded) onCampaignAdded();
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Unexpected error.";
            alert("Error: " + errorMsg);
        }
    };

    return (
        <Card sx={{ mb: 4, p: 2 }}>
            <CardContent>
                <Typography variant="h5" gutterBottom>Create new campaign! 🚀</Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth label="Campaign name" name="name" value={formData.name} onChange={handleChange} required />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField select fullWidth label="Town" name="townName" value={formData.townName} onChange={handleChange} required>
                                {towns.map((town) => (
                                    <MenuItem key={town.id} value={town.name}>{town.name}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <Autocomplete
                                multiple
                                freeSolo
                                options={availableKeywords}
                                value={formData.keywords}
                                onChange={(_, newValue) => setFormData({ ...formData, keywords: newValue })}
                                renderInput={(params) => <TextField {...params} label="Keywords" />}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField fullWidth type="number" label="Bid" name="bidAmount" value={formData.bidAmount} onChange={handleChange} inputProps={{ step: 0.01, min: 0.01 }} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField fullWidth type="number" label="Budget" name="budget" value={formData.budget} onChange={handleChange} inputProps={{ step: 0.1, min: 20.0 }} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField fullWidth type="number" label="Range (km)" name="radius" value={formData.radius} onChange={handleChange} inputProps={{ min: 0 }} />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="success" size="large" fullWidth>
                                Add campaign and pay
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
        </Card>
    );
};

export default CampaignForm;