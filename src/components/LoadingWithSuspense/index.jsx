import React, { Suspense } from 'react';


export const LoadingWithSuspense = (Component, props) => {

    return <Suspense fallback={
        <div>Notiek ielāde...</div>
    }>
        <Component {...props} match={props.match} />
    </Suspense>;
};