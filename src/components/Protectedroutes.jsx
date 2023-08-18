import React from "react";
import { Navigate } from "react-router-dom";

const Protectedroutes = (props) => {
    if(window.sessionStorage.getItem('login_data') !== null){
        return props.component
    }
    else{
        return <Navigate to="/" />
    }
}

export default Protectedroutes