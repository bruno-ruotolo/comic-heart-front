import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import styled from "styled-components";
import Swal from "sweetalert2";

import { UserContext } from "../Context/UserContext ";
import Header from "./Header/Header";

export default function Checkout() {
  const { userInfos } = useContext(UserContext);
  const navigate = useNavigate();
}
