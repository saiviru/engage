import { googleLogout } from "@react-oauth/google";
import React from "react";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logout, addUser } from "../../Store/reducers/loginReducer";

const Logout = () => {
    let dispatch = useDispatch();

    const isAuthenticated = useSelector((state) => state.login.isAuthenticated);

    const logoutNow = () => {
        dispatch(logout());
        dispatch(addUser({}));
    }
    return (
        <Button onClick={()=>{logoutNow()}}>Logout</Button>
    )
}

export default Logout;