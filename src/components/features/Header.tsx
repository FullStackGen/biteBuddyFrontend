// Header.tsx (TypeScript + React)

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router";
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    FormControl,
    FormLabel,
    IconButton,
    InputAdornment,
    OutlinedInput,
    useMediaQuery,
    useTheme
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import debounce from "lodash/debounce";

import darkModeIcon from "../../assets/dark-mode.svg";
import lightModeIcon from "../../assets/light-mode.svg";
import defaultAvatar from "../../assets/default-user-avatar.svg";
import { dashboardComponentButtons, SignUpOrLoginFormData } from "../../constants/ui-constants";
import { Theme } from "../../types/customTypes";
import { login, signUp } from "../../services/services";


const Header: React.FC = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [open, setOpen] = useState(false);
    const [formType, setFormType] = useState<"Sign Up" | "Login">("Sign Up");
    const [formData, setFormData] = useState<{
        [key: string]: { value: string; error: string };
    }>({
        name: { value: "", error: "" },
        emailId: { value: "", error: "" },
        mobile: { value: "", error: "" },
        password: { value: "", error: "" }
    });


    const refs: {
        [key: string]: React.RefObject<HTMLInputElement | null>;
    } = {
        name: useRef<HTMLInputElement>(null),
        emailId: useRef<HTMLInputElement>(null),
        mobile: useRef<HTMLInputElement>(null),
        password: useRef<HTMLInputElement>(null)
    };

    const materialTheme = useTheme();
    const fullScreen = useMediaQuery(materialTheme.breakpoints.down("md"));
    const [theme, setTheme] = useState<Theme>(() => {
        const saved = localStorage.getItem("theme");
        if (saved === "light" || saved === "dark") return saved;
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    });
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);
    const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((s) => !s);
    const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault();


    const checkError = (id: string, rawValue: string): string => {
        const val = rawValue.trim();
        switch (id) {
            case "name":
                if (val.length < 3) return "Name must be at least 3 characters long";
                return "";
            case "emailId":
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return "Please enter a valid email address";
                return "";
            case "mobile":
                if (!/^\d{10}$/.test(val)) return "Please enter a valid 10-digit mobile number";
                return "";
            case "password":
                if (rawValue.length < 6) return "Password must be at least 6 characters long";
                if (!/[A-Z]/.test(rawValue)) return "Password must contain at least one uppercase letter";
                if (!/[a-z]/.test(rawValue)) return "Password must contain at least one lowercase letter";
                if (!/[0-9]/.test(rawValue)) return "Password must contain at least one number";
                if (!/[!@#$%^&*(),.?\":{}|<>]/.test(rawValue))
                    return "Password must contain at least one special character";
                return "";
            default:
                return "";
        }
    };

    // 1) Immediate setter to update formData.value + formData.error, debounced
    //    This runs 1000ms after user stops typing in that field.
    //    In the meantime, refs hold the "current" input value.
    const changeFormDataDebounced = useCallback(
        debounce((id: string, rawValue: string) => {
            const errMsg = checkError(id, rawValue);
            setFormData((prev) => ({
                ...prev,
                [id]: { value: rawValue, error: errMsg }
            }));
        }, 1000),
        []
    );


    const changeFormType = (type: "Sign Up" | "Login") => {
        setFormType(type);
        setFormData({
            name: { value: "", error: "" },
            emailId: { value: "", error: "" },
            mobile: { value: "", error: "" },
            password: { value: "", error: "" }
        });

        Object.values(refs).forEach((r) => {
            if (r.current) r.current.value = "";
        });
    };


    const closeDialog = () => {
        setOpen(false);
        changeFormType("Sign Up");
    };



    const submitForm = async () => {

        changeFormDataDebounced.flush(); // this forces the last debounce call to fire now


        const requiredFields = formType === "Sign Up"
            ? ["name", "emailId", "mobile", "password"]
            : ["emailId", "password"];

        let updated = { ...formData };
        let hasError = false;

        requiredFields.forEach((key) => {
            const rawFromRef = refs[key].current?.value ?? "";
            const trimmed = rawFromRef.trim();
            let newErr = "";
            if (trimmed === "") {
                newErr = "This field is required";
            } else {
                const valErr = checkError(key, rawFromRef);
                if (valErr) newErr = valErr;
            }

            if (newErr) hasError = true;
            updated[key] = { value: trimmed, error: newErr };
        });
        setFormData(updated);
        if (hasError) {
            console.error("Form has errors, cannot submit", updated);
            return;
        }

        let payload: any = {};
        requiredFields.forEach((k) => {
            const payloadKey: any = SignUpOrLoginFormData.find((data: any) => data.id === k);
            payload[payloadKey?.apiKey] = updated[k].value;
        });

        payload = {
            ...payload,
            role: 'ROLE_ADMIN'
        }

        console.log("Form submitted successfully:", formType, payload);


        try {
            let apiResponse;
            if (formType !== "Login") {
                apiResponse = await signUp(payload);
            } else {
                apiResponse = await login(payload.email, payload.password);
            }

            if (apiResponse) {
                console.log("API Response:", apiResponse.data);
            }
            closeDialog();
            console.log("API Response:", apiResponse);
        } catch (error) {
            console.log("error", error);
        }
        closeDialog()
    };

    return (
        <main className="shadow-lg shadow-gray-300 drop-shadow-2xl border border-b border-cyan-100 bg-blue-100 dark:bg-blue-900 z-10">
            <header className="flex items-center justify-between p-4 m-4">
                <div>
                    <h1 className="text-3xl font-bold text-shadow-2xs leading-4">BiteBuddy</h1>
                </div>
                <div className="flex justify-between items-center gap-2 space-x-4">
                    {dashboardComponentButtons.map(({ id, name, route }) => {
                        const isActive = pathname === route;
                        return (
                            <section key={id} id={id}>
                                <button
                                    onClick={() => navigate(route)}
                                    className={`text-lg font-mono font-medium italic cursor-pointer 
                    ${isActive ? "bg-blue-600 text-white" : "bg-transparent hover:bg-blue-100"}`}
                                >
                                    {name}
                                </button>
                            </section>
                        );
                    })}
                    <section>
                        <button
                            onClick={() => setOpen(true)}
                            className="text-lg font-mono font-medium italic cursor-pointer"
                        >
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
                            className="shadow-md p-3 border border-transparent rounded-full outline-none bg-white hover:bg-gray-100 transition-all hover:duration-500 transform hover:scale-110 hover:rotate-12 hover:drop-shadow-lg dark:bg-gray-700 dark:hover:bg-gray-600 cursor-pointer ease-in-out duration-300"
                        >
                            <img
                                className="w-3 h-3"
                                alt="toggle-theme"
                                src={theme === "dark" ? darkModeIcon : lightModeIcon}
                                loading="lazy"
                            />
                        </button>
                    </section>
                </div>
            </header>



            <Dialog
                open={open}
                fullWidth
                maxWidth="md"
                fullScreen={fullScreen}
                onClose={closeDialog}
                sx={{
                    "& .MuiPaper-root": {
                        borderRadius: "1rem", // equivalent to tailwind’s rounded-2xl
                    },
                }}
            >
                <DialogContent className="flex items-center justify-center flex-col gap-8">
                    <div className="text-center pt-12 font-bold text-2xl text-shadow-2xs">
                        {formType === "Sign Up" ? "Create an Account" : "Login to your Account"}
                    </div>
                    <Box className="grid grid-cols-12 gap-12" component="section">
                        {SignUpOrLoginFormData.filter((fd) => {
                            return formType === "Login"
                                ? fd.id === "emailId" || fd.id === "password"
                                : true;
                        }).map((fd) => {
                            const { id, label, type, placeholder } = fd;
                            const fieldState = formData[id] || { value: "", error: "" };

                            return (
                                <FormControl
                                    key={id}
                                    className="w-80 block col-span-6 mb-8"
                                    sx={{ display: "block" }}
                                >
                                    <FormLabel htmlFor={id}>{label}</FormLabel>
                                    <OutlinedInput
                                        id={id}
                                        fullWidth
                                        inputRef={refs[id]}
                                        type={type === "password" && showPassword ? "text" : type}
                                        placeholder={placeholder}
                                        error={Boolean(fieldState.error)}
                                        defaultValue={fieldState.value}
                                        className="mt-2"
                                        sx={{ borderRadius: "0.8rem", outline: 0 }} // equivalent to tailwind’s rounded-2xl
                                        onChange={(e) => changeFormDataDebounced(id, e.target.value)}
                                        {...(type === "password"
                                            ? {
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label={
                                                                !showPassword ? "Hide password" : "Show password"
                                                            }
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            className="rounded-2xl" // ← if you want the icon button itself to be rounded
                                                        >
                                                            {!showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }
                                            : {})}
                                    />
                                    {fieldState.error && (
                                        <span className="text-red-500">{fieldState.error}</span>
                                    )}
                                </FormControl>
                            );
                        })}
                    </Box>

                    <section className="flex flex-col items-center justify-center">
                        <div>
                            <Button
                                sx={{ borderRadius: "0.8rem" }} // equivalent to tailwind’s rounded-2xl
                                onClick={submitForm}
                                variant="contained"
                                className="mt-4 p-8 z-50 shadow-2xl drop-shadow-2xl shadow-cyan-50 border rounded-2xl"
                            >
                                {formType}
                            </Button>
                        </div>
                        <div className="mt-4">
                            {formType === "Sign Up" ? (
                                <>
                                    Already have an account?{" "}
                                    <Button onClick={() => changeFormType("Login")} variant="text">
                                        Login
                                    </Button>
                                </>
                            ) : (
                                <>
                                    Need to create a new account?{" "}
                                    <Button onClick={() => changeFormType("Sign Up")} variant="text">
                                        Sign Up
                                    </Button>
                                </>
                            )}
                        </div>
                    </section>
                </DialogContent>
            </Dialog>


        </main>
    );
};

export default Header;