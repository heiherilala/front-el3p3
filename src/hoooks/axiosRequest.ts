import axios from "axios";
import { url } from "inspector";
import { APIUrl } from "../constants";



const instance = axios.create({
  baseURL: APIUrl,
  timeout: 1000,
});


export const postPutDeletRequest = (
  endPoint:string,
  body:any,
  id:number|string|null,
  post:boolean,
  put:boolean,
  functionIfTrue:(()=>void)|null, 
  functionIfFalse:(()=>void)|null,
  token:string|undefined,
  changeError:React.Dispatch<React.SetStateAction<string>>|null,
  )=>{
    if (token==undefined) {
      axios[post?"post":put?"put":"delete"](APIUrl+endPoint+(id==null?"":"/"+id), body)
      .then(
        (response)=>{


          console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFf");
          console.log(response);
          
          if (functionIfTrue!=null) {
            functionIfTrue()
          }
          ;
        
        
        
        }
      )
      .catch(
        (e)=>{
          console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
          if (changeError!=null) {
            changeError("c'est modifiet")
          }
          if (functionIfFalse!=null) {
            functionIfFalse()
          }
        }
      )
    }else {
      axios[post?"post":put?"put":"delete"](APIUrl+endPoint+(id==null?"":"/"+id), body, {headers: {'Authorization': 'Bearer ' + token}})
      .then(
        (response)=>{
          console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFf");
          console.log(response);
          if (functionIfTrue!=null) {
            functionIfTrue()
          }
          ;}
      )
      .catch(
        
        (e)=>{
          console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
          console.log(e);
          if (changeError!=null) {
            changeError("c'est modifiet")
          }
          if (functionIfFalse!=null) {
            functionIfFalse()
          }
        }
      )
    }

};


  export const axiosGget = (
    endPoint:string, 
    token:string|undefined,
    takingData:React.Dispatch<React.SetStateAction<any>>, 
    functionIfTrue:(()=>void)|null, 
    functionIfFalse:(()=>void)|null
  )=>{
  
    if (token==undefined) {
      axios(APIUrl+endPoint)
      .then((response) => {
        takingData(response.data);
        if (functionIfTrue!=null) {
          functionIfTrue()
        }
      })
      .catch((error) => {
        if (functionIfFalse!=null) {
          functionIfFalse()
        }
      });
    }else{
      axios(
        APIUrl+endPoint,
        {headers: {'Authorization': 'Bearer ' + token}}
      )
      .then((response) => {
        takingData(response.data);
        if (functionIfTrue!=null) {
          functionIfTrue()
        }
      })
      .catch((error) => {
        if (functionIfFalse!=null) {
          functionIfFalse()
        }
      });
    }
  }










export const axiosGetWithPage = (
  endPoint:string, 
  page:number, 
  page_sise:number,
  token:string|undefined,
  takingData:React.Dispatch<React.SetStateAction<any[]>>, 
  functionIfTrue:(()=>void)|null, 
  functionIfFalse:(()=>void)|null
)=>{

  if (token==undefined) {
    axios(APIUrl+endPoint+"?"+"page="+page+"&page_size="+page_sise)
    .then((response) => {
      takingData(response.data);

      if (functionIfTrue!=null) {
        functionIfTrue()
      }
    })
    .catch((error) => {
      if (functionIfFalse!=null) {
        functionIfFalse()
      }
    });
  }else{
    axios(
      APIUrl+endPoint+"?"+"page="+page+"&page_size="+page_sise,
      {headers: {'Authorization': 'Bearer ' + token}}
    )
    .then((response) => {
      takingData(response.data);

      if (functionIfTrue!=null) {
        functionIfTrue()
      }
    })
    .catch((error) => {
      if (functionIfFalse!=null) {
        functionIfFalse()
      }
    });
  }
}


export const conection=(
  endPoint:string, 
  token:string|undefined,
  takingData:React.Dispatch<React.SetStateAction<any>>, 
  functionIfTrue:(()=>void)|null, 
  functionIfFalse:(()=>void)|null
)=>{



  axios(
    APIUrl+endPoint,
    {headers: {'Authorization': 'Bearer ' + token}}
  )
  .then((response) => {

    takingData(response.data);
    const timer = setInterval(()=>{
      if (response.data.role=="MANAGER"||response.data.role=="TEACHER") {
        localStorage.setItem("user", JSON.stringify({accessToken:token,username:"herilala"}));
        window.location.href=("/new-event");
      };
      clearInterval(timer)
    },1000)


    if (functionIfTrue!=null) {
      functionIfTrue()
    }
  })
  .catch((error) => {
    if (functionIfFalse!=null) {
      functionIfFalse()
    }
  });



}





export const postPutDeletRequestArray = (
  endPoint:string,
  body:any,
  id:number|string|null,
  post:boolean,
  put:boolean,
  functionIfTrue:(()=>void)|null, 
  functionIfFalse:(()=>void)|null,
  token:string|undefined,
  changeError:React.Dispatch<React.SetStateAction<string>>|null,
  )=>{
    if (token==undefined) {
      axios[post?"post":put?"put":"delete"](APIUrl+endPoint+(id==null?"":"/"+id), body)
      .then(
        (response)=>{


          console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFf");
          console.log(response);
          
          if (functionIfTrue!=null) {
            functionIfTrue()
          }
          ;
        
        
        
        }
      )
      .catch(
        (e)=>{
          console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
          if (changeError!=null) {
            changeError("c'est modifiet")
          }
          if (functionIfFalse!=null) {
            functionIfFalse()
          }
        }
      )
    }else {
      axios[post?"post":put?"put":"delete"](APIUrl+endPoint+(id==null?"":"/"+id), body, {headers: {'Authorization': 'Bearer ' + token}})
      .then(
        (response)=>{
          console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFf");
          console.log(response);
          if (functionIfTrue!=null) {
            functionIfTrue()
          }
          ;}
      )
      .catch(
        
        (e)=>{
          console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
          console.log(e);
          if (changeError!=null) {
            changeError("c'est modifiet")
          }
          if (functionIfFalse!=null) {
            functionIfFalse()
          }
        }
      )
    }

};
