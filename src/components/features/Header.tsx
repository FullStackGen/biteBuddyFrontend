import { useState, useEffect, use, useCallback } from "react";

import darkModeIcon from "../../assets/dark-mode.svg"
import lightModeIcon from "../../assets/light-mode.svg"
import defaultAvatar from "../../assets/default-user-avatar.svg";
import searchIcon from "../../assets/search.svg";

import { dashboardComponentButtons, SignUpFormData } from "../../constants/ui-constants";
import { Theme, ButtonsData } from "../../types/customTypes";
import { useLocation, useNavigate } from "react-router";
import { Box, Button, debounce, Dialog, DialogContent, DialogTitle, FormControl, FormLabel, Icon, IconButton, InputAdornment, InputLabel, OutlinedInput, useMediaQuery, useTheme } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Header = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation()
    const [open, setOpen] = useState(false);
    const [loginFormData, setLoginFormData] = useState<any>([]);
    const [formType, setFormType] = useState<string>("Sign Up");
    const [formData, setFormData] = useState<any>({
        "name": {
            "value": "",
            "error": ""
        },
        "emailId": {
            "value": "",
            "error": ""
        },
        "mobile": {
            "value": "",
            "error": ""
        },
        "password": {
            "value": "",
            "error": ""
        }
    })
    const materialTheme = useTheme();
    const fullScreen = useMediaQuery(materialTheme.breakpoints.down("md"));
    const buttonsSectionDetails: ButtonsData[] = dashboardComponentButtons;


    const [showPassword, setShowPassword] = useState(true);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const changeFormType = (type: string) => {
        console.log("Changing form type to: ", type);
        setFormData({
            "name": {
                "value": "",
                "error": ""
            },
            "emailId": {
                "value": "",
                "error": ""
            },
            "mobile": {
                "value": "",
                "error": ""
            },
            "password": {
                "value": "",
                "error": ""
            }
        });
        setFormType(type);
    };

    const checkError = (id: string, value: any): string => {
        switch (id) {
            case "name":
                if (value.length < 3) {
                    return "Name must be at least 3 characters long";
                }
                break;
            case "emailId":
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    return "Please enter a valid email address";
                }
                break;
            case "mobile":
                const mobileRegex = /^\d{10}$/; // Assuming a 10-digit mobile number
                if (!mobileRegex.test(value)) {
                    return "Please enter a valid 10-digit mobile number";
                }
                break;
            case "password":
                if (value.length < 6) {
                    return "Password must be at least 6 characters long";
                }
                if (!/[A-Z]/.test(value)) {
                    return "Password must contain at least one uppercase letter";
                }
                if (!/[a-z]/.test(value)) {
                    return "Password must contain at least one lowercase letter";
                }
                if (!/[0-9]/.test(value)) {
                    return "Password must contain at least one number";
                }
                if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
                    return "Password must contain at least one special character";
                }
                break;
            default:
                return "";
        }
        return "";
    }

    const closeDialog = () => {
        setOpen(false);
        setFormType("Sign Up");
        setFormData({
            "name": {
                "value": "",
                "error": ""
            },
            "emailId": {
                "value": "",
                "error": ""
            },
            "mobile": {
                "value": "",
                "error": ""
            },
            "password": {
                "value": "",
                "error": ""
            }
        });
    }




    const changeFormData = (id: string, value: any) => {
        const error = checkError(id, value);
        setFormData({ ...formData, [id]: { value: value, error: error } })
    }

    //  Create a debounced version of _updateField:
    //    - lodash.debounce(fn, 500) returns a function that waits 1000ms after the last call
    //    - useCallback ensures we don’t recreate the debounced function on every render
    const debouncedUpdateField = useCallback(
        debounce((id: string, value: string) => {
            changeFormData(id, value);
        }, 1000),
        []
    );


    const submitForm = () => {
        let updated: any = { ...formData };
        let hasError = false;

        Object.entries(formData).forEach(([key, field]: any) => {
            const val = (field.value || "").trim();
            const existingError = checkError(key, val);

            // If the field is empty → “This field is required”
            // Else if it fails checkError → that string
            // Otherwise → no error
            let newError = "";
            if (val === "") {
                newError = "This field is required";
            } else if (existingError) {
                newError = existingError;
            }

            if (newError) {
                hasError = true;
            }

            updated[key] = { value: val, error: newError };
        });

        // 2) Push those “required” or validation errors into state so the UI updates
        setFormData(updated);

        // 3) If any field has an error, stop here
        if (hasError) {
            console.error("Form has errors, cannot submit", updated);
            return;
        }

  


        console.log("Form submitted successfully with data: ", formData);

        setFormData({
            "name": {
                "value": "",
                "error": ""
            },
            "emailId": {
                "value": "",
                "error": ""
            },
            "mobile": {
                "value": "",
                "error": ""
            },
            "password": {
                "value": "",
                "error": ""
            }
        });
        closeDialog();
    }


    const [theme, setTheme] = useState<Theme>(() => {
        const saved = localStorage.getItem("theme");
        if (saved === "light" || saved === "dark") {
            return saved;
        }
        return window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    });

    useEffect(() => {
        setLoginFormData(SignUpFormData);
    }, [])


    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);


    const toggleTheme = () =>
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));

    const routeToPage = (route: string) => {
        navigate(route);
    }

    return (
        <main className="shadow-lg shadow-gray-300 drop-shadow-2xl border border-b border-cyan-100 bg-blue-100 dark:bg-blue-900  z-10">
            <header className="flex items-center justify-between p-4 m-4">
                <div>
                    <h1 className="text-3xl font-bold text-shadow-2xs leading-4">BiteBuddy</h1>
                </div>

                <div className="flex justify-between items-center gap-2 space-x-4">

                    {buttonsSectionDetails.map(({ id, name, route }) => {
                        const isActive = pathname === route;
                        return (
                            <section key={id} id={id}>
                                <button onClick={() => routeToPage(route)} className={`text-lg font-mono font-medium italic cursor-pointer 
                                        ${isActive ? "bg-blue-600 text-white" : "bg-transparent hover:bg-blue-100"}`}>
                                    {name}
                                </button>
                            </section>
                        )
                    })}


                    <section>
                        <button onClick={() => setOpen(true)} className="text-lg font-mono font-medium italic cursor-pointer">
                            Login / Sign Up
                        </button>
                    </section>

                    <section className="border border-transparent p-3 rounded-full dark:shadow-sm shadow-md shadow-amber-300 bg-amber-200 transition-all transform hover:scale-120 cursor-pointer ease-snappy duration-300">
                        <img className="w-5 h-5" alt="User-Avatar" src={defaultAvatar} loading="lazy" />
                    </section>

                    <section>
                        <button
                            aria-label="Toggle theme"
                            onClick={toggleTheme}
                            className="shadow-md p-3 border border-transparent rounded-full outline-none bg-white hover:bg-gray-100   transition-all hover:duration-500 transform hover:scale-110 hover:rotate-12 hover:drop-shadow-lg   dark:bg-gray-700 dark:hover:bg-gray-600 cursor-pointer ease-in-out duration-300"
                        >
                            <img
                                className="w-3 h-3"
                                alt="toggle-theme"
                                src={theme === "dark" ? darkModeIcon : lightModeIcon}
                                loading="lazy"
                            />
                        </button>
                    </section>

                    {/* <section>
              <button
                aria-label="Toggle search"
                onClick={toggleTheme}
                className="shadow-md p-3 border border-transparent rounded-full outline-none bg-white hover:bg-gray-100   transition-all hover:duration-500 transform hover:scale-110 hover:rotate-12 hover:drop-shadow-lg   dark:bg-gray-700 dark:hover:bg-gray-600 cursor-pointer ease-in-out duration-300"
              >
                <img
                  className="w-3 h-3"
                  alt="toggle-search"
                  src={searchIcon}
                  loading="lazy"
                />
              </button>
            </section> */}


                    {/* <section className="border border-transparent p-3 rounded-full dark:shadow-sm shadow-md shadow-amber-300 bg-amber-200 transition-all transform hover:scale-120 cursor-pointer ease-snappy duration-300">
              <img className="w-5 h-5" alt="User-Avatar" src={defaultAvatar} loading="lazy" />
            </section> */}

                </div>
            </header>

            <Dialog
                fullWidth={true}
                maxWidth="md"
                open={open}
                onClose={closeDialog}
            >
                <DialogTitle id="login-signup-dialog-title">
                    {formType === "Sign Up" ? "Create an Account" : "Login to your Account"}
                </DialogTitle>
                <DialogContent>
                    <Box className="py-8 grid grid-cols-12 gap-8" content="section">
                        {
                            formType === "Login" ? null : (
                                <>
                                    <FormControl className="w-80 block col-span-6 mb-8" sx={{ display: 'block' }} >
                                        <FormLabel id="name-label">Name</FormLabel>
                                        {/* <InputLabel id="name-label">Name</InputLabel> */}
                                        <OutlinedInput
                                            fullWidth={true}
                                            id="name-input"
                                            error={formData?.['name']?.error?.length}
                                            inputMode="text"
                                            label="Name"
                                            multiline={true}
                                            required={true}
                                            className="mt-2"
                                            placeholder="Enter full name"
                                            notched={false}
                                            onChange={(e) => debouncedUpdateField("name", e.target.value)}
                                        >
                                        </OutlinedInput>
                                        <span className="text-red-500">
                                            {formData?.['name']?.error}
                                        </span>
                                    </FormControl>

                                    <FormControl className="w-80 block col-span-6 mb-8" sx={{ display: 'block' }} >
                                        <FormLabel id="mobile-label">Mobile Number</FormLabel>
                                        {/* <InputLabel id="name-label">Name</InputLabel> */}
                                        <OutlinedInput
                                            fullWidth={true}
                                            id="mobile-input"
                                            error={formData?.['mobile']?.error?.length}
                                            inputMode="text"
                                            label="MobileNumber"
                                            multiline={true}
                                            required={true}
                                            className="mt-2"
                                            placeholder="Enter mobile number"
                                            notched={false}
                                            onChange={(e) => debouncedUpdateField("mobile", e.target.value)}
                                        >
                                        </OutlinedInput>
                                        <span className="text-red-500">
                                            {formData?.['mobile']?.error}
                                        </span>
                                    </FormControl>
                                </>
                            )
                        }


                        <FormControl className="w-80 block col-span-6 mb-8" sx={{ display: 'block' }} >
                            <FormLabel id="emailId-label">Email ID</FormLabel>
                            {/* <InputLabel id="emailId-label">Enter Email ID</InputLabel> */}
                            <OutlinedInput
                                fullWidth={true}
                                id="emailId-input"
                                error={formData?.['emailId']?.error?.length}
                                inputMode="text"
                                label="Email ID"
                                multiline={true}
                                required={true}
                                className="mt-2"
                                placeholder="Enter email ID"
                                notched={false}
                                onChange={(e) => debouncedUpdateField("emailId", e.target.value)}

                            >
                            </OutlinedInput>
                            <span className="text-red-500">
                                {formData?.['emailId']?.error}
                            </span>
                        </FormControl>


                        <FormControl className="w-80 block col-span-6 mb-8" sx={{ display: 'block' }} >
                            <FormLabel id="pass-label ">Password</FormLabel>
                            {/* <InputLabel id="name-label">Name</InputLabel> */}
                            <OutlinedInput
                                fullWidth={true}
                                id="pass-input"
                                error={formData?.['password']?.error?.length}
                                label="Password"
                                required={true}
                                type={showPassword ? 'password' : 'text'}
                                className="mt-2"
                                placeholder="Enter password"
                                notched={false}
                                onChange={(e) => debouncedUpdateField("password", e.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label={
                                                showPassword ? 'hide the password' : 'display the password'
                                            }
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            onMouseUp={handleMouseUpPassword}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            >
                            </OutlinedInput>
                            <span className="text-red-500">
                                {formData?.['password']?.error}
                            </span>
                        </FormControl>

                    </Box>

                    <section className="flex flex-col items-center justify-center">
                        <div>
                            <Button onClick={submitForm} fullWidth={false} variant="contained" className="mt-4 p-8">
                                {formType}
                            </Button>
                        </div>

                        <div>
                            {formType === "Sign Up" ?
                                (<>Already have an account ?
                                    <Button onClick={() => changeFormType('Login')} fullWidth={false} variant="text" className="">
                                        Login
                                    </Button></>) :
                                (<>Need to create a new Account ?
                                    <Button onClick={() => changeFormType('Sign Up')} fullWidth={false} variant="text" className="">
                                        Sign Up
                                    </Button></>)}
                        </div>
                    </section>


                </DialogContent>

            </Dialog>
        </main >

    );
}

export default Header;
