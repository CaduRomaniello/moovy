import React from 'react';
import { Route, redirect } from 'react-router-dom';
 
const RouteGuard = ({ component: Component, ...rest }) => {
 
   function hasJWT() {
      let flag = false;

      //check user has JWT token
      localStorage.getItem("token") ? flag=true : flag=false
    
      return flag
   }
 
   return (
      <Route {...rest}
        render={props => (
          hasJWT() ?
            <Component {...props} />
            :
            redirect("/")
        )}
      />
   );
};
 
export default RouteGuard;