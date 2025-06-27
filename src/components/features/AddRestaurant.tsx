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
    Tooltip,
    IconButton,
    Snackbar,
    Alert,
    Input,
    Dialog,
    DialogTitle,
    DialogContent,
} from "@mui/material";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";
import { useState, useCallback, useRef } from "react";
import { addMenuFormData, addRestaurantFormData } from "../../constants/ui-constants";
import debounce from "lodash/debounce";
import { addRestaurant, modifyRestaurant, searchRestaurantById } from "../../services/services";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SearchIcon from '@mui/icons-material/Search';
import RestaurantDetails from "./RestaurantDetails";

const AddRestaurant = () => {
    const [restaurantAction, setRestaurantAction] = useState<"" | "add" | "modify">("");
    const [processed, setProcessed] = useState(false);
    const [addedRestaurantData, setaddedRestaurantData] = useState<any>(null);
    const [copySuccess, setCopySuccess] = useState(false);
    const [isModificationDone, setIsModificationDone] = useState(false);
    const [isMenuDialogOpen, setIsMenuDialogOpen] = useState(false);
    const modifyRef = useRef<any>(null)
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
        if (id === "rating") {
            const num = parseFloat(value);
            if (isNaN(num) || num < 0 || num > 5) return "Rating must be between 0 and 5";
        }
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

    const handleAddMenuModal = () => {
        setIsMenuDialogOpen(true);
    }

    const checkDisabled = () => {

        const hasErrors = Object.values(formData).some(
            (field) => field.error || !field.value.trim()
        );


        if (isModificationDone && addedRestaurantData) {
            const isModified = Object.entries(formData).some(([key, field]) => {
                const originalValue = addedRestaurantData[key];
                if (originalValue !== undefined && originalValue !== null) {
                    return field.value.toString() !== originalValue.toString();
                }
                return field.value.trim() !== '';
            });

            return hasErrors || !isModified;
        }


        return hasErrors;
    }

    const handleEditRestaurantDetails = () => {
        console.log("Edit restaurant details clicked");
        setProcessed(false);
        setIsModificationDone(true);
        setRestaurantAction("add");


        if (addedRestaurantData) {
            const prefilledData = { ...initialFormState };

            Object.keys(prefilledData).forEach(key => {
                if (addedRestaurantData[key] !== undefined && addedRestaurantData[key] !== null) {
                    prefilledData[key] = {
                        value: addedRestaurantData[key].toString(),
                        error: ""
                    };
                }
            });


            setFormData(prefilledData);


            setTimeout(() => {
                addRestaurantFormData.forEach(fd => {
                    const { id } = fd;
                    if (refs[id].current && addedRestaurantData[id] !== undefined && addedRestaurantData[id] !== null) {
                        refs[id].current.value = addedRestaurantData[id].toString();
                    }
                });
            }, 0);
        }
    }

    const submitAddNewRestaurant = async () => {
        console.log("Submitting new restaurant with data:", formData);
        let payload = Object.keys(formData).reduce((acc, key) => {
            acc[key] = formData[key].value;
            return acc;
        }, {})
        payload = {
            ...payload,
            "status": "Y",
        }

        console.log("Payload to be sent:", payload);
        let addRestaurantApiData;
        if (!isModificationDone) {
            addRestaurantApiData = await addRestaurant(payload);
        } else {
            addRestaurantApiData = await modifyRestaurant(payload, addedRestaurantData.restaurantId);
        }

        console.log("Response from addRestaurant API:", addRestaurantApiData);
        if (addRestaurantApiData) {
            setaddedRestaurantData(addRestaurantApiData.data);
            setProcessed(true);
            setFormData(initialFormState);
            if (isModificationDone) {
                setIsModificationDone(false);
            }
            addRestaurantFormData.forEach(fd => {
                if (refs[fd.id].current) {
                    refs[fd.id].current.value = "";
                }
            });
        }
    }

    const copyToClipboard = async () => {
        if (addedRestaurantData?.restaurantId) {
            try {
                await navigator.clipboard.writeText(addedRestaurantData.restaurantId.toString());
                setCopySuccess(true);

                // Hide success message after 2 seconds
                setTimeout(() => {
                    setCopySuccess(false);
                }, 2000);
            } catch (err) {
                console.error('Failed to copy text: ', err);
            }
        }
    }

    const searchRestaurant = async () => {
        const restaurantId = modifyRef?.current?.value?.trim();
        console.log("Searching for restaurant with ID:", restaurantId);
        const searchRestaurantApiData = await searchRestaurantById(restaurantId);
        console.log("Response from searchRestaurantById API:", searchRestaurantApiData);
        setaddedRestaurantData(searchRestaurantApiData?.data);
        setProcessed(true);
        // if (!restaurantId) { }
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

            {restaurantAction === "add" ? (
                <div className="text-center mt-4">
                    <Typography variant="h6" color="primary">
                        {isModificationDone ? "Modify Restaurant Details" : "Add a new Restaurant"}
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
                                                    inputProps={
                                                        type === "number" && id === 'rating'
                                                            ? { min: 0, max: 5, step: 0.5 }
                                                            : undefined
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
                                    <Button disabled={checkDisabled()} onClick={submitAddNewRestaurant} className="px-6 py-8 rounded-xl" variant="contained">
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
                            <Typography variant="h6" color="primary" sx={{ marginBottom: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                                Restaurant ID: {addedRestaurantData?.restaurantId || "N/A"}
                                <Tooltip title="Copy to clipboard" placement="top" arrow>
                                    <IconButton onClick={copyToClipboard} size="small" color="primary">
                                        <ContentCopyIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                            </Typography>
                            <Snackbar
                                open={copySuccess}
                                autoHideDuration={2000}
                                onClose={() => setCopySuccess(false)}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                            >
                                <Alert severity="success" sx={{ width: '100%' }}>
                                    Restaurant ID copied to clipboard!
                                </Alert>
                            </Snackbar>
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
            ) : (
                <section className="text-center mt-4 flex items-center justify-center ">
                    <Input
                        inputRef={modifyRef}
                        type="container"
                        endAdornment={
                            <SearchIcon onClick={searchRestaurant} className="cursor-pointer"></SearchIcon>
                        }
                        placeholder="Search for a restaurant by ID"
                        sx={{ width: '100%', maxWidth: 600, borderRadius: '0.8rem', padding: '10px', boxShadow: 2, backgroundColor: 'background.paper' }}
                    />
                </section >
            )}

            {
                addedRestaurantData && processed ?
                    (
                        <section className="mt-8">
                            <div className="text-center font-bold text-xl font-stretch-100% my-8">Restaurant Details</div>
                            <RestaurantDetails resData={addedRestaurantData} handleEditRestaurantDetails={handleEditRestaurantDetails} handleAddMenuModal={handleAddMenuModal}></RestaurantDetails>
                        </section>
                    )
                    : null
            }
            <Dialog open={isMenuDialogOpen}>
                <DialogTitle>Add New Menu Item</DialogTitle>
                <DialogContent>
                    <h1>Please Fill the below form to add a new menu Item</h1>

                    <Box className="grid grid-cols-12 gap-x-12 gap-y-12 justify-center items-center" component="section">
                        {addMenuFormData.map((fd) => {
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
                                            inputProps={
                                                type === "number" && id === 'rating'
                                                    ? { min: 0, max: 5, step: 0.5 }
                                                    : undefined
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
                            <Button disabled={checkDisabled()} onClick={submitAddNewRestaurant} className="px-6 py-8 rounded-xl" variant="contained">
                                Submit
                            </Button>
                        </section>

                    </Box>
                </DialogContent>
            </Dialog>
        </section >
    );
};

export default AddRestaurant;
