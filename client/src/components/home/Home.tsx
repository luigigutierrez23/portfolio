import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home(){
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/");
    }

    return(
        <>
            <h1>Home</h1>
            <div>
                <button onClick={handleClick}>Go Home</button>
            </div>
        </>
    )
}