import { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { getAccountBalance } from '../services/api';

const AccountBalance = ({ triggerRefresh }) => { 
    const [balance, setBalance] = useState(0);

    const fetchBalance = async () => {
        try {
            const body = await getAccountBalance(1);
            setBalance(body.balance);
        } catch (error) {
            console.error("Could not fetch balance", error);
        }
    };

    useEffect(() => {
        fetchBalance();
    }, [triggerRefresh]);

    return (
        <Card sx={{ minWidth: 275, mb: 2, bgcolor: '#e3f2fd' }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    Emerald Account
                </Typography>
                <Typography variant="h4" color="primary">
                    {balance} Emeralds 
                </Typography>
            </CardContent>
        </Card>
    );
}; 

export default AccountBalance;