import React from 'react';
import { renderRoutes } from 'react-router-config';
import { Redirect } from 'react-router-dom';

const Root = ({ route, location, logged }) => {
    const a = 12;
console.log(route,location)
    if (!logged && location.pathname !== '/login') return <Redirect to="/login" />;
    
    return (
        <div className="container">
            {renderRoutes(route.routes)}
        </div>
    );
}

export default Root;