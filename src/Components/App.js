import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignUp from "./SignUp/SignUp";

import GlobalStyles from "../GlobalStyles";


export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}