
import { Field, FieldArray, useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Application, event, group, JobOffer, newInterfaceUser, place, User } from "../interfaces";
import { axiosGetWithPage, axiosGget, getCurrentUser, postPutDeletRequest } from "../hoooks";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import { userIdType } from "aws-sdk/clients/sts";
import { manualtoken } from "../constants";
import ConfirmDispo from "./ConfirmDispo";
import ModalError from "./ModalError";
interface props {
  changObject:event|undefined;
  finishFunction:()=>void
}




const FormulaireAdd: React.FC<props> = (props) => {

  const [error,setError] = useState("");
  const [errorActiv,setErrorActiv] = useState(false);
  const [reusiActiv,setReusiActiv] = useState(false);
  const newDate = new Date;
  const h = newDate.getHours();
  const mn = newDate.getMinutes();
  const y = ""+newDate.getFullYear();
  const m = newDate.getMonth()<10?"0"+newDate.getMonth():""+newDate.getMonth();
  const d = newDate.getDate()<10?"0"+newDate.getDate():""+newDate.getDate();
  const dat = "" + y +"-"+ m +"-" + d;

  const [myToken,setMyToken] = useState<string>();
  const loadToken = () => {
    const user = getCurrentUser();
    if (user) {
      const subtitutionValue:string =  user.accessToken;
      setMyToken(subtitutionValue);
    }
  }

  useEffect(loadToken, []);


  const [materials, setMaterials] = useState<userIdType[]>([])
  const [places, setPlaces] = useState<place[]>([])
  const [group, setGroup] = useState<group[]>([])
  const [managers, setManagers] = useState<newInterfaceUser[]>([])
  const [teachers, setTeachers] = useState<newInterfaceUser[]>([])
  useEffect(()=>{
    axiosGetWithPage("/materials",1,100,getCurrentUser().accessToken,setMaterials,()=>{},()=>{console.log("materials"+myToken);});
    axiosGget("/places",getCurrentUser().accessToken,setPlaces,()=>{},()=>{console.log("places"+myToken);});
    axiosGetWithPage("/groups",1,100,myToken,setGroup,()=>{},()=>{console.log("groups"+myToken);});
    axiosGetWithPage("/managers",1,100,myToken,setManagers,()=>{},()=>{console.log("managers"+myToken);});
    axiosGetWithPage("/teachers",1,100,myToken,setTeachers,()=>{},()=>{console.log("teachers"+myToken);});
  },[myToken])

  const changObject =  props.changObject;
  const object1:string = changObject?changObject.id:"";
  const object2:string = changObject?changObject.name:"";
  const object3:string = changObject?changObject.startingTime.split("T")[0]:''+dat;
  const object4:string = changObject?changObject.endingTime.split("T")[0]:''+dat;
  const object12:string = changObject?changObject.eventType:'COURSE';
  const object5:string = changObject?changObject.id:"";
  const object6:string = changObject?changObject.supervisor.id:"";
  const object7:string = changObject?changObject.place.id:"";
  const object8:number = changObject?Number(changObject.startingTime.split("T")[1].split(":")[0]):h;
  const object9:number = changObject?Number(changObject.endingTime.split("T")[1].split(":")[0]):((h+2)%24);
  const object10:number = changObject?Number(changObject.startingTime.split("T")[1].split(":")[1]):mn;
  const object11:number = changObject?Number(changObject.endingTime.split("T")[1].split(":")[1]):mn;

  const formik= useFormik({
    initialValues: {
      nameEvent: object2,
      dateDebut: object3,
      dateFin: object4,
      type: object12,
      group: object5,
      responsable: object6,
      place: object7,
      startingHour: object8,
      endingHour: object9,
      startingMin: object10,
      endingMin: object11,
    },
    validationSchema: Yup.object({
      nameEvent: Yup.string()
        .max(100, "Caractère inferieur ou egale à 100")
        .required("Requis"),
      dateDebut: Yup.string()
        .max(100, "Caractère inferieur ou egale à 100")
        .required("Requis"),
      dateFin: Yup.string()
        .max(100, "Caractère inferieur ou egale à 100")
        .required("Requis"),
      startingMin: Yup.number()
        .max(59, "Minute trop élevé (>59)")
        .required("Requis")
        .typeError('Saisissez des chiffres'),
      endingHour: Yup.number()
        .max(24, "heure trop élevé (>24)")
        .required("Requis")
        .typeError('Saisissez des chiffres'),
      endingMin: Yup.number()
        .max(59, "Minute trop élevé (>59)")
        .required("Requis")
        .typeError('Saisissez des chiffres'),
      startingHour: Yup.number()
        .max(24, "heure trop élevé (>24)")
        .required("Requis")
        .typeError('Saisissez des chiffres'),
      place: Yup.string()
        .max(100, "Caractère inferieur ou egale à 100")
        .required("Requis"),
      type: Yup.string()
        .max(100, "Caractère inferieur ou egale à 100")
        .required("Requis"),
      group: Yup.string()
        .max(100, "Caractère inferieur ou egale à 100")
        .required("Requis"),
      responsable: Yup.string()
        .max(100, "Caractère inferieur ou egale à 100")
        .required("Requis"),
    }),
    onSubmit: (values) => {

      setLoadingCheck(true);



      
      const objectData = [{
        name:values.nameEvent,
        eventType:values.type=="COURSE"?"COURSE":"EXAMINATION"?"EXAMINATION":"MEETING"?"MEETING":"COURSE",
        place:{id:values.place},
        supervisor:{id:values.responsable},
        startingTime:values.dateDebut+"T"+values.startingHour+":"+values.startingMin+":00",
        endingTime:values.dateFin+"T"+values.endingHour+":"+values.endingMin+":00",
      }];


      try{

        
        postPutDeletRequest("/events",objectData,null,false,true,()=>{setLoadingCheck(false);props.finishFunction()},()=>{setErrorActiv(true)},myToken,setError);
        console.log();
        
      } catch (error){};
    },
  });

  




  const [loadingCheck, setLoadingCheck] = useState<boolean>(false);


  if (true) {
    return (
      <div className="componentForm">
          <div className="d-flex flex-column bd-highlight">
            <div className="">
              {'      '}<h3 className="">Information sur l'evenement</h3>
            </div>
            <form
              action=""
              onSubmit={formik.handleSubmit}
              onReset={formik.handleReset}
            >
      
              <div className="form-group">
                <label htmlFor="id" className="label_input">
                  Nom de l'evenment:
                </label>
                <input
                  id="nameEvent"
                  type="text"
                  className="form-control"
                  placeholder="Nom complet"
                  value={formik.values.nameEvent}
                  onChange={formik.handleChange}
                />
                {formik.errors.nameEvent ? (
                  <p> {formik.errors.nameEvent} </p>
                ) : null}
              </div>                         

              <div className="form-group">
                <label htmlFor="id" className="label_input">
                Type de l'evenment:
                </label>
                <select
                  id="type"
                  className="form-control"
                  placeholder="Type"
                  value={formik.values.type}
                  onChange={formik.handleChange}
                >
                    <option value={"COURSE"} label={"COURSE"}>
                      {"COURSE"}
                    </option>
                    <option value={"EXAMINATION"} label={"EXAMINATION"}>
                      {"EXAMINATION"}
                    </option>
                    <option value={"MEETING"} label={"MEETING"}>
                      {"MEETING"}
                    </option>
                </select>
                {formik.errors.type ? <p> {formik.errors.type} </p> : null}
              </div>  

              <div className="form-group">
                <label htmlFor="id" className="label_input">
                place:
                </label>
                <select
                  id="place"
                  className="form-control"
                  placeholder="place"
                  value={formik.values.place}
                  onChange={formik.handleChange}
                >
                  {places.map(data=>(
                    <option value={data.id} label={data.id}>
                      {data.id}
                    </option>
                  ))}
                </select>
                {formik.errors.place ? <p> {formik.errors.place} </p> : null}
              </div> 
                    

              <div className="form-group">
                <label htmlFor="id" className="label_input">
                Responsable:
                </label>
                <select
                  id="responsable"
                  className="form-control"
                  placeholder="Responsable"
                  value={formik.values.responsable}
                  onChange={formik.handleChange}
                >
                  {managers.concat(teachers).map(data=>(
                    <option value={data.id} label={data.id}>
                      {data.id}
                    </option>
                  ))}
                </select>
                {formik.errors.responsable ? <p> {formik.errors.responsable} </p> : null}
              </div> 

              <div className="form-group">
                <label htmlFor="id" className="label_input">
                Groupe:
                </label>
                <select
                  id="group"
                  className="form-control"
                  placeholder="Group"
                  value={formik.values.group}
                  onChange={formik.handleChange}
                >
                  {group.map(data=>(
                    <option value={data.id} label={data.id}>
                      {data.id}
                    </option>
                  ))}
                </select>
                {formik.errors.group ? <p> {formik.errors.group} </p> : null}
              </div> 

              <div className="form-row transparant">

                <div className="form-group col-md-6">
                  <label htmlFor="id" className="label_input">
                    Date début:
                  </label>
                  <input
                    id="dateDebut"
                    type="date"
                    className="form-control"
                    placeholder="dateDebut professionnel"
                    value={formik.values.dateDebut}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.dateDebut ? <p> {formik.errors.dateDebut} </p> : null}
                </div>


                <div className="row row-cols-2 bigWith">
                  <div className="form-group col transparant">
                    <label htmlFor="id" className="label_input">
                      heur:
                    </label>
                    <input
                      id="startingHour"
                      type="text"
                      className="form-control"
                      placeholder="salaire"
                      value={formik.values.startingHour}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.startingHour ? <p> {formik.errors.startingHour} </p> : null}
                  </div>  
                  <div className="form-group col transparant">
                    <label htmlFor="id" className="label_input">
                      Minut:
                    </label>
                    <input
                      id="startingMin"
                      type="text"
                      className="form-control"
                      placeholder="salaire"
                      value={formik.values.startingMin}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.startingMin ? <p> {formik.errors.startingMin} </p> : null}
                  </div>  
                </div>

              </div>

              <div className="form-row">

                <div className="form-group col-md-6">
                  <label htmlFor="id" className="label_input">
                    Date de fin:
                  </label>
                  <input
                    id="dateFin"
                    type="date"
                    className="form-control"
                    placeholder="dateFin professionnel"
                    value={formik.values.dateFin}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.dateFin ? <p> {formik.errors.dateFin} </p> : null}
                </div>
                <div className="row row-cols-2 bigWith">
                  <div className="form-group col transparant">
                    <label htmlFor="id" className="label_input">
                      heur:
                    </label>
                    <input
                      id="endingHour"
                      type="text"
                      className="form-control"
                      placeholder="salaire"
                      value={formik.values.endingHour}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.endingHour ? <p> {formik.errors.endingHour} </p> : null}
                  </div>  
                  <div className="form-group col transparant">
                    <label htmlFor="id" className="label_input">
                      Minut:
                    </label>
                    <input
                      id="endingMin"
                      type="text"
                      className="form-control"
                      placeholder="salaire"
                      value={formik.values.endingMin}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.endingMin ? <p> {formik.errors.endingMin} </p> : null}
                  </div>  
                </div>


              </div>

              <span className="d-flex justify-content-center">
                <button type="submit" className={"btn btn-outline-secondary"}>
                  {"Confirmer".toUpperCase()}
                </button>
              </span>

            </form>

          </div>
          {loadingCheck?Loading(()=>{setLoadingCheck(false)}):<></>}
          {errorActiv?<ModalError corps={"la dernière opération a été annulee en raison d'une erreur"} finish={() => { setErrorActiv(false); } } title={"Erreur Trouver"}/>:<></>}
          {reusiActiv?<ModalError corps={"la dernière opération a été effectuer avec sucser"} finish={() => { setReusiActiv(false); } } title={"Sucser"}/>:<></>}
      </div>
      
    );
  }else{
    return(<></>)
  }

};

export default FormulaireAdd;
