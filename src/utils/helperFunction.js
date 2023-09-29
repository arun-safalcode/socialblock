import React from 'react'
import {showMessage} from "react-native-flash-message";

const showError = (mesaage)=>{
    showMessage({
        message: mesaage,
        type: "danger",
        icon: "danger",
    });
}
const showSuccess = (mesaage)=>{
    showMessage({
        message: mesaage,
        type: "success",
        icon: "success",
    });
}

export {
    showError,
    showSuccess
}