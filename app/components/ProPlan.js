import { Card, CardActionArea, CardContent, CardHeader, Typography, Button } from "@mui/material";
import React from "react";
import { getStripe } from '../utils/get-stripe'

export default function ProPlan() {
    const handleSubmit = async () => {
        const checkoutSession = await fetch('/api/checkout_sessions', {
            method: 'POST',
            headers: { origin: 'http://localhost:3000' },
        })
        const checkoutSessionJson = await checkoutSession.json();

        const stripe = await getStripe();
        const { error } = await stripe.redirectToCheckout({
            sessionId: checkoutSessionJson.id,
        })

        if (error) {
            console.warn(error.message)
        }
    }
    return (
        <Box sx={{ my: 6 }}>
            <Typography variant="h4" component="h2" gutterBottom>Features</Typography>
            <Grid container spacing={4}>
                // Features
                <Card>
                    <CardHeader title="Free" />
                    <CardContent>
                        Create your own flashcards! Add, update, and delete flashcards or corresponding flashcard sets.
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader title="Pro Plan" />
                    <CardContent>
                        Use our AI to generate cards for you based on any topic and difficulty level.
                    </CardContent>
                    <CardActionArea onClick={handleSubmit}>
                        <Button variant="contained" color="primary" fullWidth>
                            Upgrade to Pro
                        </Button>
                    </CardActionArea>
                </Card>
            </Grid>
        </Box>
    );
}