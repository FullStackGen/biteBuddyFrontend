export interface OrderItem {
    // Define the properties of your order item, for example:
    id: string;
    name: string;
    quantity: number;
    // Add more fields as needed
}

export interface OrdersState {
    items: OrderItem[];
}

export interface Userstate {
    userDetails: any;
    isAuthenticated: boolean;
}

interface UserDetails {
    id: string;
    name: string;
    email: string;
    mobileNumber?: string,
    profilePic?: Blob
}