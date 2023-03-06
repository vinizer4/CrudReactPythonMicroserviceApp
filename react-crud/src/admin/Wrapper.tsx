import React, {PropsWithChildren} from 'react';

const Wrapper = (props: PropsWithChildren<any>) => {
    return (
        <div style={{width: "100%", height: "100%"}}>
                <div>
                    {props.children}
                </div>
        </div>
    );
};

export default Wrapper;
