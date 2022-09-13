import React from 'react';

const Loading = (FinishLoading:()=>void) => {
    return (
        <div className="realBackground">
            <button className={"custom_color_3"}  onClick={()=>{FinishLoading()}}>
            <span className="spinner-border spinner-border-sm marge"></span>
            {"  "}Chargement en cours
            </button>
        </div>
    );
};

export default Loading;