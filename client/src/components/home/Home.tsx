import React from "react";
import { Link } from "react-router-dom";

export default function Home(){
    return(
        <>
            <div className="home">
                <h1>Home</h1>
                <div>
                    <Link to={'/asd'}>Go Home</Link>
                </div>
            </div>
        </>
    )
}