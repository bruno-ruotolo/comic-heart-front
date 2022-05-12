import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignUp from "./SignUp/SignUp";
import SignIn from "./SignIn/SignIn";
import Main from "./Main";
import UserProvider from "../Context/UserContext ";
import Product from "./Product";

import GlobalStyles from "../GlobalStyles";

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <GlobalStyles />
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/" element={<SignIn />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/main" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}
