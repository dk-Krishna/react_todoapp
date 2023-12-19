import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { Context, server } from "../main";
import axios from "axios";
import toast from "react-hot-toast";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context);

  const logoutHandler = async () => {
    setLoading(true);
    
    try {
      const { data } = await axios.get(`${server}/user/logout`, { withCredentials: true });
      
      toast.success(data.message);
      setIsAuthenticated(false);
      setLoading(false);

    } catch(err) {
      toast.error(err.response.data.message);
      console.log(err);
      setIsAuthenticated(true);
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <nav className="header">
        <div>
          <h2>Todo App.</h2>
        </div>

        <article>
          <Link to={"/"}> Home </Link>
          <Link to={"/profile"}> Profile </Link>
          {isAuthenticated ? (
            <button disabled={loading} className="btn" onClick={logoutHandler}>Logout</button>
          ) : (
            <Link to={"/login"}> Login </Link>
          )}
        </article>
      </nav>
    </Fragment>
  );
};

export default Header;
