import React from 'react';
import { importedObject } from '../interfaces';

const ChooseFace = (data:importedObject[],faceActive:number | null,setFaceActive:React.Dispatch<React.SetStateAction<number | null>>) => {
    if (faceActive==null) {
        return(
            <>
                <h2>Choose a face:</h2>
                {data.map((donne, key)=>{
                    return(
                        <button type='button' className="chooseFace btn btn-primary" onClick={()=>setFaceActive(key)}>
                            {"face "} 
                            <span className="badge badge-light">{key}</span>
                            <span className="sr-only">unread messages</span>
                        </button>
                    )
                })}
            </>
        )

    }else{
        return(
            <div>
                <h2>{"Detail of the face N°"+faceActive}</h2>
                <button type='button' className="chooseFace btn btn-success" onClick={()=>setFaceActive(null)}>
                    {" Return to face selection "} 
                </button>
            </div>
        )

    }
};

export default ChooseFace;