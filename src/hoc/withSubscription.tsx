import { useState, useEffect } from 'react';

export function withSubscription(WrappedComponent: React.ComponentType) {
    return (props: any) => {
        const [data, setData] = useState();

        useEffect(() => {


        }, [data])

        return <WrappedComponent {...props} />;
    }
}