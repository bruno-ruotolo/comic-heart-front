import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignUp from "./SignUp/SignUp";
import SignIn from "./SignIn/SignIn";
import Main from "./Main";
import UserProvider from "../Context/UserContext ";
import Product from "./Product";

import GlobalStyles from "../GlobalStyles";
import Cart from "./Cart";

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <GlobalStyles />
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/" element={<SignIn />} />
          <Route path="/main" element={<Main />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}
