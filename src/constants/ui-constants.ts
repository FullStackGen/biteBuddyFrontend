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
    id: "name",
    label: "Name",
    type: "text",
    placeholder: "Enter your name",
    apiKey: "name"
  },
  {
    id: "emailId",
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
    apiKey: "email"
  },
  {
    id: "mobile",
    label: "Mobile Number",
    type: "text",
    placeholder: "Enter your mobile number",
    apiKey: "phoneNumber"
  },
  {
    id: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    apiKey: "password"
  }
];
