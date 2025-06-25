export const dashboardComponentButtons = [
    {
      id: "home",
      name: "Home",
      route: "/",
      component: "Home"
    },
    {
      id: "add-restaurant",
      name: "Add new Restaurant",
      route: "/add-restaurant",
      component: "AddRestaurant"
    },
      {
      id: "restaurants",
      name: "Restaurant",
      route: "/restaurant",
      component: "RestaurantDetails"
    },
    {
      id: "orders",
      name: "Orders",
      route: "/orders",
      component: "Orders"
    }
]

export const SignUpOrLoginFormData = [
    {
    id: "role",
    label: "User Role",
    type: "select",
    options: [
      { label: "Customer", value: "ROLE_CUSTOMER" },
      { label: "Admin", value: "ROLE_ADMIN" },
    ],
    placeholder: "",
    apiKey: "role",
    showIn: ["Sign Up"]
  },
  {
    id: "name",
    label: "Name",
    type: "text",
    placeholder: "Enter your name",
    apiKey: "name",
    showIn: ["Sign Up"]
  },
  {
    id: "emailId",
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
    apiKey: "email",
    showIn: ["Sign Up", "Login"]
  },
  {
    id: "mobile",
    label: "Mobile Number",
    type: "text",
    placeholder: "Enter your mobile number",
    apiKey: "phoneNumber",
    showIn: ["Sign Up"]
  },
  {
    id: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    apiKey: "password",
    showIn: ["Sign Up", "Login"]
  }
];

export const addRestaurantFormData = [
   {
    id: "restaurantName",
    label: "Restaurant Name",
    type: "text",
    placeholder: "Enter the restaurant name",
    apiKey: "restaurantName"
  },
  {
    id: "state",
    label: "Restaurant State",
    type: "text",
    placeholder: "Enter the restaurant state",
    apiKey: "state"
  },
  {
    id: "location",
    label: "Restaurant Location",
    type: "text",
    placeholder: "Enter the restaurant location",
    apiKey: "location"
  },
  {
    id: "cuisine",
    label: "Cuisine",
    type: "text",
    placeholder: "Enter the cuisine",
    apiKey: "cuisine"
  },
]

