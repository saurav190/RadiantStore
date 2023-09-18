// userAuth types
export interface User {
  username: string;
  email: string;
  password: string;
  avatar: string | null;
  gender: string;
  dateOfBirth: string | null;
}

 export interface CartItem {
    id: number;
    category: string;
    description: string;
    image: string;
    title: string;
    price: number;
    rating: {
      rate: number;
      count: number;
    };
    quantity: number;
    totalPrice: number;
  }

 export interface productDataState {
    id: number;
    category: string;
    description: string;
    image: string;
    title: string;
    price: number;
    rating: {
      rate: number;
      count: number;
    };
    quantity: number;
    totalPrice: number;
  }

  export interface Product {
    id: number;
    title: string;
    category: string;
  }


  export interface CategoryItem {
    name: string;
    icon: string;
  }
  
