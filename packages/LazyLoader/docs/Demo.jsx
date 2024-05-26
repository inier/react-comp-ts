import React from 'react';
import './Demo.scss';

const Demo = ({ list = ['A', 'B', 'C', 'D'] }) => {
    return (
        <div className="wrap">
            {list.map((item, index) => {
                return (
                    <div key={index} className="piece">
                        {item}
                    </div>
                );
            })}
        </div>
    );
};

export default Demo;
