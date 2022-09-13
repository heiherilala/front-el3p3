import { Discovery, ImportExport } from 'aws-sdk';
import React, { useEffect, useRef, useState } from 'react';
import AwsGet from '../ancien/AwsGet';
import ChooseFace from '../Components/ChooseFace';
import DataFace from '../Components/DataFace';
import { baba, ProjectUrl } from '../constants';
import { img, importedObject } from '../interfaces';
import Loading from '../Components/Loading';
import MarqFace from '../Components/MarqFace';
import './index.css';
import NavbarHeader from '../Components/NavbarHeader';
import { Carousel } from 'react-bootstrap';
import addImage from './add-imag2.png'



  
  

const Recognition = () => {

    const [image, setImage] = useState<string>("");
    const [preview, setPreview] = useState<img[]>([]);
    const [count, setCount] = useState<number>(0);
    const [awsResponsee, setAwsResponsee] = useState<importedObject[]>([baba]);
    const fielInputRef = useRef<HTMLInputElement|null>(null);
    const [oneString, setOneString] = useState<string>("not modified");
    const [faceActive, setFaceActive] = useState<number|null>(null);
    const [loadingCheck, setLoadingCheck] = useState<boolean>(false);
    const [smallLoad,setSmallLoad] = useState<boolean>(true);
    
    useEffect(()=>{
        setOneString(awsResponsee!=undefined?awsResponsee[0].Gender.Value:"c'est undifaid");
    },[count])

    
    const imageTo64 = (file: File | Blob): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
            resolve(reader.result as string);
            };

            reader.readAsDataURL(file);
            reader.onerror = reject;
            console.log(reader.result);
            
        });

    useEffect(()=>{
        console.log(awsResponsee);
        console.log(image);
    },[count]);


    const analyze = (key:number) => {
        setAwsResponsee([baba]);
        setLoadingCheck(true);
        if (preview[key]?.base64String.includes("data:image/jpeg;base64,")) {
          setImage(preview[key]?.base64String.split("data:image/jpeg;base64,")[1]);
        } else if (preview[key]?.base64String.includes("data:image/png;base64,")) {
          setImage(preview[key]?.base64String.split("data:image/png;base64,")[1]);
        } else {
          console.log("fichier n'est ni jpeg ni png");
        }
        setCount(current => current + 1);
        console.log("analyze rune");
      };

    const takingImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
          const file = e.target.files[0];
        const tempFileList: img = {
          fileName: file.name,
          base64String: file.type.indexOf('image') > -1 ? await imageTo64(file) : '',      
        };
        console.log(preview);
        const newValue:img[]=preview;

        if (preview.length==0) {
            newValue.push(tempFileList);
            setPreview(newValue);    
            newValue.push(tempFileList);
            setPreview(newValue);  
        }else{
            newValue.push(tempFileList);
            setPreview(newValue);  
        }

        setSmallLoad(false);
        const timer = setInterval(()=>{setSmallLoad(true);clearInterval(timer)},1000)
        console.log(preview);
        analyze(preview.length-1);
        }
      };


      useEffect(()=>{
        console.log(awsResponsee);
        
        if ((awsResponsee[0]==baba)) {
            setLoadingCheck(true)
        }
      },[awsResponsee]);


      const [index, setIndex] = useState(0);

      const handleSelect = (selectedIndex:any, e:any) => {
        setIndex(selectedIndex);
      };












    return (
        <div>
        {NavbarHeader(
            [
                {name:"Listes des offres d’emplois",href: (ProjectUrl + "/list-job")},
                {name:"Listes des candicatures",href: (ProjectUrl + "/application")}
            ],
            {name:"Offre d’emploi",href: (ProjectUrl + "/")}

        )}







            <h1 className="headerPage text-success">
                Facial recognition with AWS
            </h1>
            <div className="d-flex flex-column justify-content-center align-items-center">
                <div className="image-contener d-flex flex-column justify-content-center align-items-center">
                    {preview.length==0?
                        <button className='btn btn-outline-secondary activBouton ' onClick={
                            (e)=>{
                                e.preventDefault();
                                fielInputRef.current?.click()
                            }
                        }>Add image</button>
                    :
                        <button className='btn btn-outline-secondary nonActivBouton' onClick={
                            (e)=>{
                                e.preventDefault();
                                fielInputRef.current?.click()
                            }
                        }>Another image</button>
                    }


                    <input 
                    style={{display:"none"}}
                    type="file" 
                    accept='image/*'
                    ref={fielInputRef}
                    onChange={takingImage}/>
                    {preview.length==1?<></>:!smallLoad?<></>:
                        <Carousel activeIndex={index} onSelect={handleSelect}>
                            <Carousel.Item key={""+0}>
                                <img className='d-block w-100' src={preview[0]?.base64String} alt={preview[0]?.fileName} onClick={
                                    (e)=>{
                                        //e.preventDefault();
                                        //fielInputRef.current?.click();
                                    }
                                }></img>
                                    {MarqFace(awsResponsee,faceActive,setFaceActive)}
                                    <Carousel.Caption>
                                        <h3>First slide label</h3>
                                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                    </Carousel.Caption>
                            </Carousel.Item>
                                {(preview.slice(2)).map((donne,keyId)=>(
                                    <Carousel.Item key={""+donne.base64String}>
                                        <img className='d-block w-100' src={preview[keyId+2]?.base64String} alt={preview[keyId+2]?.fileName} onClick={
                                            (e)=>{
                                                //e.preventDefault();
                                                //fielInputRef.current?.click();
                                            }
                                        }></img>
                                            {MarqFace(awsResponsee,faceActive,setFaceActive)}
                                            <Carousel.Caption>
                                                <h3>{"N°"+keyId}</h3>
                                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                            </Carousel.Caption>
                                    </Carousel.Item>
                                ))}

                            <Carousel.Item key={""+0}>
                                <img className='d-block w-100' src={addImage} alt={preview[0]?.fileName} onClick={
                                    (e)=>{
                                        //e.preventDefault();
                                        //fielInputRef.current?.click();
                                    }
                                }></img>
                                    {MarqFace(awsResponsee,faceActive,setFaceActive)}
                                    <Carousel.Caption>
                                        <h3>First slide label</h3>
                                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                    </Carousel.Caption>
                            </Carousel.Item>

                        </Carousel>}
                </div>

                <AwsGet imageData={image} resultat={setAwsResponsee} count={count} setLoadingCheck={setLoadingCheck}/>




                <div className="donnePage">
                
                    {
                        preview.length==0?<></>:(loadingCheck?Loading(()=>{setLoadingCheck(false)}):(ChooseFace(awsResponsee,faceActive,setFaceActive)))
                    }
                    {
                        (faceActive==null?<div></div>:DataFace(awsResponsee[faceActive]))
                    }
                </div>
                
            </div>
        </div>
    );
};

export default Recognition;