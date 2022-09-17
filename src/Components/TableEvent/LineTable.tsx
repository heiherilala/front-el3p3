import axios from 'axios';
import { isEmptyArray } from 'formik';
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { postPutDeletRequest } from '../../hoooks';
import { event } from '../../interfaces';
import ConfirmDispo from '../ConfirmDispo';
import FormulaireAplication from '../FormulaireAdd';
import Loading from '../Loading';




interface props{
    idLine: any;
    item: event;
    actualisationAllData: () => void;
    takeVauleObjectByNumber:(n: [number, number | null, number | null], o: Object) => string
    mofif:boolean
    delet:boolean
    token: string|undefined
  }

export const LigneList:React.FC<props> = (props) => {
    const[activPut,setActivPut]=useState<Boolean>(false)
    const idLine = props.idLine;
    const item = props.item;
    const takeVauleObjectByNumber = props.takeVauleObjectByNumber;



    const [activLoading,setActivLoading]= useState<boolean>(false)
    const [activModif,setActivModif]= useState<boolean>(false)
    const [activModifPut,setActivModifPut]= useState<boolean>(false)

    const startSctivLoading =()=> setActivLoading(true);
    const finishLoadingt:()=>void = ()=>{
        const temer1 = setInterval(()=>{
            setActivModif(false);
            setActivLoading(false);
            setActivModifPut(false);
            clearInterval(temer1);
        },500);
        props.actualisationAllData();

    }
    


    

    return (
        <>
            
            <tr id={""+item.name} key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.place.name}</td>
                    <td>{item.supervisor.firstName+" "+item.supervisor.lastName}</td>
                    <td>{item.eventType}</td>
                    <td>{item.startingTime.split("T")[0]}</td>
                {((props.mofif))?
                    <td>
                                <button onClick={()=>{setActivModifPut(true);}} type="button" className={"btn custom_color_1"}><i className="bi bi-pencil-square"></i></button>
                    </td>:<></>
                }
                {((props.delet))?
                    <td>
                                <button onClick={()=>{setActivModif(true);}} type="button" className={"btn custom_color_1"}><i className="bi bi-pencil-square"></i></button>
                    </td>:<></>
                }
            </tr>


            {activModif?
            <ConfirmDispo
                corps={"Vouler vous vraimont faire ses modification?"}
                finish = {()=>{setActivModif(false)}}
                function = {()=>{
                    postPutDeletRequest("/offers",null,item.id,false,true,()=>finishLoadingt(),()=>()=>{setActivModif(false)},props.token,null);
                }
            }
            />:<></>}
                
                
                
                
            {activModifPut?<div className='fonds3'>
                <Modal show={true} onHide={()=>setActivModifPut(false)}>
                    <FormulaireAplication changObject={item} finishFunction={()=>{setActivModifPut(false);props.actualisationAllData()}} />
                </Modal>
            </div>:<></>}



            {activLoading?Loading(()=> {props.actualisationAllData();setActivModifPut(false)}):<></>}
        </>
    );
};


