
import { Field, FieldArray, useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { APIUrl, backgroundColor } from "../constants";
import { Application, JobOffer } from "../interfaces";
import { getCurrentUser, postPutDeletRequest } from "../hoooks";
import { useEffect, useState } from "react";
interface props {
  idJobOffer:number;
}

const FormulaireAplication: React.FC<props> = (props) => {




  const formik = useFormik({
    initialValues: {
      nameAplication: "",
      email: "",
      profil: "",
      salary: "",
    },
    validationSchema: Yup.object({
      nameAplication: Yup.string()
        .max(100, "Caractère inferieur ou egale à 100")
        .required("Requis"),
      email: Yup.string().email()
        .max(100, "Caractère inferieur ou egale à 100")
        .required("Requis"),
      salary: Yup.number()
        .max(100000000, "salary trop élevé")
        .required("Requis")
        .typeError('Saisissez des chiffres'),
      profil: Yup.string()
        .max(100, "Caractère inferieur ou egale à 100")
        .required("Requis"),
    }),
    onSubmit: (values) => {
      const newDate = new Date;
      const y = newDate.getFullYear();
      const d = newDate.getMonth();
      const m = newDate.getDay();
      const dat = "" + y +"-0"+ m +"-0" + d


      
      const objectData = {
        candidateName: values.nameAplication,
        email: values.email,
        salary: values.salary,
        profile: values.profil,
        dateApplication: dat,
        jobOffer:{idJobOffer:props.idJobOffer},
      };
      try{
        postPutDeletRequest("/applications",objectData,null,true,false,()=>{},()=>{},myToken);
      } catch (error){};
    },
  });

  
  const [myToken,setMyToken] = useState<string>();
  const [activUpdat, setActivUpdat] = useState<boolean>(false);
  
  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      const subtitutionValue:string =  user.accessToken
      setMyToken(subtitutionValue);
    }
  }, []);


  if (true) {
    return (
      <div className="componentForm">
          <div className="d-flex flex-column bd-highlight">
            <div className="">
              {'      '}<h3 className="">Information sur vous</h3>
            </div>
            <form
              action=""
              onSubmit={formik.handleSubmit}
              onReset={formik.handleReset}
            >
                <div className="form-group">
                  <label htmlFor="id" className="label_input">
                    Votre nom:
                  </label>
                  <input
                    id="nameAplication"
                    type="text"
                    className="form-control"
                    placeholder="Nom complet"
                    value={formik.values.nameAplication}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.nameAplication ? (
                    <p> {formik.errors.nameAplication} </p>
                  ) : null}
                </div>                         

              <div className="form-group">
                <label htmlFor="id" className="label_input">
                Votre profil:
                </label>
                <input
                  
                  id="profil"
                  type="textarea"
                  className="form-control"
                  placeholder="Profil"
                  value={formik.values.profil}
                  onChange={formik.handleChange}
                />
                {formik.errors.profil ? <p> {formik.errors.profil} </p> : null}
              </div>                      

              <div className="form-row">

                <div className="form-group col-md-6">
                  <label htmlFor="id" className="label_input">
                    Votre email:
                  </label>
                  <input
                    id="email"
                    type="text"
                    className="form-control"
                    placeholder="Email professionnel"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.email ? <p> {formik.errors.email} </p> : null}
                </div>

                <div className="form-group col-md-6">
                  <label htmlFor="id" className="label_input">
                    Prétention salariale (Ar)
                  </label>
                  <input
                    id="salary"
                    type="text"
                    className="form-control"
                    placeholder="salaire"
                    value={formik.values.salary}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.salary ? <p> {formik.errors.salary} </p> : null}
                </div>  

              </div>

              <span className="d-flex justify-content-center">
                <button type="submit" className={"btn_envoie btn_type "}>
                  {"Confirmer".toUpperCase()}
                </button>
              </span>

            </form>

          </div>
      </div>
    );
  }else{
    return(<></>)
  }

};

export default FormulaireAplication;
