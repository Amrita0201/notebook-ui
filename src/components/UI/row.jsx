import React from 'react';

const row = (props) =>{
    return (
        <div className="row"> 
            {props.children}
        </div>
    );
}

export default row;