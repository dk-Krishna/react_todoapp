import React, { useContext } from 'react';
import { Context } from '../main';
import Loader from "../components/Loader.jsx";
import { Navigate } from 'react-router-dom';

const Profile = () => {
  const { user, isAuthenticated, loading } = useContext(Context);

  if(!isAuthenticated) return <Navigate to={"/login"} />

  return (
    loading ? (
      <Loader />
    ) : (
      <div>
        <h1>{ user?.name }</h1>
        <h1>{ user?.email }</h1>
      </div>
    )
  );
};

export default Profile;