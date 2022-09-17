import React from 'react';
import { activeBack } from '../constants';
import { importedObject } from '../interfaces';

const ChooseFace = (
    data:importedObject[],
    faceActive:number | null,setFaceActive:React.Dispatch<React.SetStateAction<(number | null)[]>>,
    keyId:number,
    actualisation:()=>void
    ) => {
    if (faceActive==null) {
        return(
            <>
                <h2>Voir le detail d'un eleve:</h2>
                {data.map((donne, key)=>{
                    return(
                        <button type='button' className="chooseFace btn btn-primary" onClick={
                            ()=>{
                                const newValue = activeBack;
                                newValue[keyId]=key;
                                setFaceActive(newValue);
                                actualisation();
                            }
                            }>
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
                <button type='button' className="chooseFace btn btn-success" onClick={
                        ()=>{
                            const newValue = activeBack;
                            newValue[keyId]=null;
                            setFaceActive(newValue);
                            actualisation();
                        }
                    }>
                    {" Revenir à la sélection "} 
                </button>
            </div>
        )

    }
};

export default ChooseFace;