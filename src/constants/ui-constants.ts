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

export const SignUpFormData = [
  {
    id: "name",
    label: "Name",
    type: "text",
    placeholder: "Enter your name"
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email"
  },
   {
    id: "mobileNumber",
    label: "Mobile Number",
    type: "text",
    placeholder: "Enter your mobile number"
  },
  {
    id: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password"
  }
]


export const LoginFormData = [
  {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email"
  },
  {
    id: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password"
  }
]