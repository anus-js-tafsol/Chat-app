import React from "react";
import { Link } from "react-router-dom";
import { SiteLogo } from "../assets/pathConstant";
import { useSelector } from "react-redux";
const Navigation = () => {
    const user = useSelector((state) => state.authReducer.authentication.user)
    return(
        <header className="main__header">
            <div className="container">
                <nav className="navbar">
                    <Link to="/"><img className="site-logo" src={ SiteLogo } alt="" /></Link>
                    <ul>
                        {!user._id?<Link to='login' className="btn">Login</Link>:<Link to='Logout' className="btn">Logout</Link>}
                        <Link to='chat' className="btn">Chat</Link>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Navigation