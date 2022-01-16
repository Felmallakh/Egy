import React from 'react';
import { useSelector } from 'react-redux';
import { Route, useNavigate } from "react-router-dom";

const ProtectedRoute = props => {
  const user = useSelector(state => state.session.user)
  const navigate = useNavigate()

  return (
    <Route {...props}>
      {(user)? props.children  : navigate('/login')}
    </Route>
  )
};


export default ProtectedRoute;
