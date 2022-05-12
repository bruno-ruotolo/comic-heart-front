import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignUp from "./SignUp/SignUp";
import SignIn from "./SignIn/SignIn";
import UserProvider from "../Context/UserContext ";
import CartProvider from "../Context/CartContext";
import Product from "./Product";

import GlobalStyles from "../GlobalStyles";

export default function App() {
  return (
    <UserProvider>
      <CartProvider>
        <BrowserRouter>
          <GlobalStyles />
          <Routes>
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/" element={<SignIn />} />
            <Route path="/product/:id" element={<Product />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </UserProvider>
  );
}
