import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:8080/api', 
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getCampaigns = async () => {
    const response = await api.get('/campaigns/all'); 
    return response.data;
};

export const getTowns = async () => {
    const response = await api.get('/towns');
    return response.data;
};

export const getKeywords = async () => {
    const response = await api.get('/keywords');
    return response.data;
};

export const createCampaign = async (campaignData) => {
    const response = await api.post('/campaigns', campaignData);
    return response.data;
};

export const deleteCampaign = async (id) => {
    await api.delete(`/campaigns/${id}`);
};

export const updateCampaignStatus = async (id, newStatus) => {
    await api.patch(`/campaigns/${id}/status`, { status: newStatus });
};

export const getAccountBalance = async(id) => {
    const response = await api.get(`/accounts/${id}`);
    return response.data;
};

export default api;