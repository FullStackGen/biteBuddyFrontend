import { Button, Card, CardContent, Typography, Stack, FormControl, Box } from "@mui/material";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";
import { useState } from "react";

const AddRestaurant = () => {

    const [restaurantAction, setRestaurantAction] = useState<"" | "add" | "modify">("");
    const [restaurantData, setRestaurantData] = useState<any>("");
    const [processed, setProcessed] = useState(false);
    return (
        <section>
            <Card
                sx={{
                    maxWidth: 600,
                    margin: "3rem auto",
                    padding: "2rem",
                    boxShadow: 4,
                    borderRadius: "1.5rem",
                    backgroundColor: "background.paper",
                }}
            >
                <CardContent>
                    <Typography variant="h5" gutterBottom fontWeight="bold">
                        Restaurant Management
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: 4 }}>
                        Do you want to add a new restaurant or update an existing one?
                    </Typography>

                    <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
                        <Button
                            variant="contained"
                            startIcon={<AddBusinessIcon />}
                            sx={{
                                borderRadius: "0.8rem",
                                paddingX: 3,
                                paddingY: 1,
                            }}
                            onClick={() => setRestaurantAction("add")}
                        >
                            Add Restaurant
                        </Button>

                        <Button
                            variant="outlined"
                            startIcon={<EditLocationAltIcon />}
                            sx={{
                                borderRadius: "0.8rem",
                                paddingX: 3,
                                paddingY: 1,
                            }}
                            onClick={() => setRestaurantAction("modify")}
                        >
                            Modify Restaurant
                        </Button>
                    </Stack>
                </CardContent>
            </Card>
            {restaurantAction && restaurantAction === 'add' && (
                <div className="text-center mt-4">
                    <Typography variant="h6" color="primary">
                        Add a new Restaurant
                    </Typography>
                    {
                        !processed ? (
                            <section>
                                <Typography variant="body1" sx={{ marginBottom: 8 }}>
                                    Please fill in the details below:
                                </Typography>
                                <Box className="grid grid-cols-12 gap-x-12 gap-y-6" component="section">

                                </Box>
                            </section>
                        ) : (
                            <section>
                                <Typography variant="body1" sx={{ marginBottom: 8 }}>
                                    Your restaurant has been added successfully!

                                    Please note your restaurant ID for future reference.
                                </Typography>
                                <Button variant="outlined"
                                    sx={{
                                        borderRadius: "0.8rem",
                                        paddingX: 3,
                                        paddingY: 1,
                                    }}
                                    onClick={() => setProcessed(false)}
                                >
                                    Add Another Restaurant
                                </Button>
                            </section>
                        )
                    }

                </div>
            )
            }
        </section >

    );
};

export default AddRestaurant;
