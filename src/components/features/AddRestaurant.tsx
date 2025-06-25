import {
    Button,
    Card,
    CardContent,
    Typography,
    Stack,
    FormControl,
    Box,
    FormLabel,
    OutlinedInput,
} from "@mui/material";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";
import { useState, useCallback, useRef } from "react";
import { addRestaurantFormData } from "../../constants/ui-constants";
import debounce from "lodash/debounce";
import { addRestaurant } from "../../services/services";

const AddRestaurant = () => {
    const [restaurantAction, setRestaurantAction] = useState<"" | "add" | "modify">("");
    const [processed, setProcessed] = useState(false);

    // Initialize form data structure
    const initialFormState = addRestaurantFormData.reduce((acc, curr) => {
        acc[curr.id] = { value: "", error: "" };
        return acc;
    }, {} as { [key: string]: { value: string; error: string } });

    const [formData, setFormData] = useState(initialFormState);

    // Refs
    const refs = addRestaurantFormData.reduce((acc, curr) => {
        acc[curr.id] = useRef<HTMLInputElement>(null);
        return acc;
    }, {} as { [key: string]: React.RefObject<HTMLInputElement> });

    // Validation logic
    const checkError = (id: string, value: string) => {
        if (!value.trim()) return "This field is required";
        if (id === "restaurantName" && value.length < 3) return "Restaurant name too short";
        return "";
    };

    // Debounced formData update
    const changeFormDataDebounced = useCallback(
        debounce((id: string, rawValue: string) => {
            const err = checkError(id, rawValue);
            setFormData((prev) => ({
                ...prev,
                [id]: { value: rawValue, error: err },
            }));
        }, 500),
        []
    );

    const checkDisabled = Object?.values(formData)?.some(
        (field) => field.error || !field.value.trim()
    )

    const submitAddNewRestaurant = async () => {
        console.log("Submitting new restaurant with data:", formData);
        let payload = Object.keys(formData).reduce((acc, key) => {
            acc[key] = formData[key].value;
            return acc;
        }, {})
        payload = {
            ...payload,
            "rating": 5.0,
            "status": "Y",
        }
        console.log("Payload to be sent:", payload);
        const addRestaurantApiData = await addRestaurant(payload);
        console.log("Response from addRestaurant API:", addRestaurantApiData);
    }

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
                            sx={{ borderRadius: "0.8rem", px: 3, py: 1 }}
                            onClick={() => setRestaurantAction("add")}
                        >
                            Add Restaurant
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<EditLocationAltIcon />}
                            sx={{ borderRadius: "0.8rem", px: 3, py: 1 }}
                            onClick={() => setRestaurantAction("modify")}
                        >
                            Modify Restaurant
                        </Button>
                    </Stack>
                </CardContent>
            </Card>

            {restaurantAction === "add" && (
                <div className="text-center mt-4">
                    <Typography variant="h6" color="primary">
                        Add a new Restaurant
                    </Typography>

                    {!processed ? (
                        <section>
                            <Typography variant="body1" sx={{ marginBottom: 8 }}>
                                Please fill in the details below:
                            </Typography>
                            <Box className="grid grid-cols-12 gap-x-12 gap-y-12 justify-center items-center" component="section">
                                {addRestaurantFormData.map((fd) => {
                                    const { id, label, type, placeholder } = fd;
                                    const fieldState = formData[id];

                                    return (
                                        <section key={id} className="col-span-12 sm:col-span-6">
                                            <FormControl
                                                sx={{ display: "block" }}
                                            >
                                                <FormLabel className="font-bold text-shadow-2xs" htmlFor={id}>{label}</FormLabel>
                                                <OutlinedInput
                                                    id={id}
                                                    fullWidth
                                                    inputRef={refs[id]}
                                                    type={type}
                                                    placeholder={placeholder}
                                                    error={Boolean(fieldState.error)}
                                                    defaultValue={fieldState.value}
                                                    className="mt-2"
                                                    sx={{ borderRadius: "0.8rem", outline: 0 }}
                                                    onChange={(e) =>
                                                        changeFormDataDebounced(id, e.target.value)
                                                    }
                                                />
                                                {fieldState.error && (
                                                    <span className="text-red-500 text-sm mt-2">
                                                        {fieldState.error}
                                                    </span>
                                                )}
                                            </FormControl>
                                        </section>
                                    );
                                })}

                                <section className="col-span-12 flex justify-center items-center my-6">
                                    <Button disabled={checkDisabled} onClick={submitAddNewRestaurant} className="px-6 py-8 rounded-xl" variant="contained">
                                        Submit
                                    </Button>
                                </section>

                            </Box>
                        </section>
                    ) : (
                        <section>
                            <Typography variant="body1" sx={{ marginBottom: 8 }}>
                                Your restaurant has been added successfully!
                                Please note your restaurant ID for future reference.
                            </Typography>
                            <Button
                                variant="outlined"
                                sx={{ borderRadius: "0.8rem", px: 3, py: 1 }}
                                onClick={() => setProcessed(false)}
                            >
                                Add Another Restaurant
                            </Button>
                        </section>
                    )}
                </div>
            )}
        </section>
    );
};

export default AddRestaurant;
