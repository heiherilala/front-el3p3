
import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
//import { myToken } from "../../constants";
import { axiosGetWithPage, axiosGget, getCurrentUser, logout, takeKeyObjectByNumber, takeVauleObjectByNumber } from "../../hoooks";
import { event } from "../../interfaces";
import FormulaireAplication from "../FormulaireAdd";
import Load from "../Loading";
import Arrow from "./Arrow";
import { LigneList } from "./LineTable";
import HorizontalPagination from "./Pagination";
import "./style.css";


interface props {
  colloneName: string[];
  title:string;
  delet:boolean;
  modif:boolean;
}

export const TableEvent: React.FC<props> = (props) => {
  const [activTri,setActivTri]=useState<boolean[]>([]);
  const [activLoading,setActivLoading]=useState<boolean>(true);
  const [valuNumbur, setValuNumbur] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [activUpdatePost,setActivUpdatePost]= useState<boolean>(false)
  const [myToken,setMyToken] = useState<string>()
  const [stringPage, setStringPage] = useState("120");
  const [longPage, setLongPage] = useState<number>(0);
  const [loadlongPage, setloadLongPage] = useState<number>(0);
  const [dataList, setDataList] = useState<event[]>([]);
  const [loadDataList, setLoadDataList] = useState<number>(0);

  const finishLoadingt = ()=>{setActivLoading(false)};
  const actualisationAllData =()=>{setLoadDataList(loadDataList+1);};
  const finishUpdatPost:()=>void = ()=>{const timer=setInterval(()=>{setActivUpdatePost(false);clearInterval(timer)},300); actualisationAllData()}

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      const subtitutionValue:string =  user.accessToken;
      setMyToken(subtitutionValue);
    }
  }, []);

  useEffect(() => {
    setActivLoading(true)
    //axiosGetWithPage("/events",page,valuNumbur,myToken,setDataList,()=>{setActivLoading(false)},null)
    axiosGget("/events",myToken,setDataList,()=>{setActivLoading(false)},null)
  }, [loadDataList,page,valuNumbur,myToken])



  useEffect(() => {
    //axiosGget("//count",myToken,setStringPage,null,null)
    //setLongPage(Number(stringPage));
    setLongPage(100)
  }, [loadlongPage])


  const [tri, setTri] = useState("");

  let  items = dataList;

  const colloneName: string[] = props.colloneName;


  return (
    <div className="d-flex flex-column mb-3 ForcedFisplayColone marging-top">
      <h2 className="titleCoctail"> {props.title} </h2>
      <div className="dataTable-header p-2">
        <div className="dataTable-dropdown">
          <label>
            <select className="dataTable-selector">
              <option value="5" onClick={() => setValuNumbur(5)}>
                5
              </option>
              <option value="10" onClick={() => setValuNumbur(10)} selected>
                10
              </option>
              <option value="15" onClick={() => setValuNumbur(15)}>
                15
              </option>
              <option value="20" onClick={() => setValuNumbur(20)}>
                20
              </option>
              <option value="25" onClick={() => setValuNumbur(25)}>
                25
              </option>
            </select>{" "}
            entité par pages
          </label>
        </div>
        {(props.delet||props.modif)?<div className="dataTable-search">
          <Button variant="primary" onClick={()=>{setActivUpdatePost(true)}} className="custom_color">Ajouter</Button>
        </div>:<></>}
      </div>
      <div className="dataTable-container p-2 bd-highlight">
        <Table striped bordered hover className="tableBody">
          <thead>
            <tr>
              {colloneName.map((value,key)=>{return(
                <th>
                  {value}
                </th>
              )})}
              {(props.modif)?<th className="center"> {"modif"} </th>:<></>}
              {(props.delet)?<th> {"supr"} </th>:<></>}
            </tr>
          </thead>
          <tfoot>
            <tr>
            {colloneName.map((value,key)=>{return(
                <th>
                  {value} {Arrow(activTri[key])}
                </th>
              )})}
              {(props.modif)?<th className="center"> {"modif"} </th>:<></>}
              {(props.delet)?<th> {"supr"} </th>:<></>}
            </tr>
          </tfoot>
          <tbody>
            {items.map((item) => {
              if (true)
                return (
                  <LigneList
                    idLine={1}
                    item={item}
                    actualisationAllData={actualisationAllData}
                    takeVauleObjectByNumber={takeVauleObjectByNumber}// :(n: [number, number | null, number | null], o: Object) => string
                    mofif={props.modif}
                    delet={props.delet}
                    token={myToken}
                  />
                );
            })}
          </tbody>
        </Table>
      </div>
      <div className="dataTable-bottom p-2">
        <div className="dataTable-info">
          {"Affiche " +
            (page * valuNumbur - valuNumbur + 1) +
            " à " +
            Math.min(page * valuNumbur, items.length) +
            " sur " +
            items.length +
            " données"}
        </div>
        <nav className="dataTable-pagination">
          {HorizontalPagination(longPage, valuNumbur, page, setPage, tri)}
        </nav>
      </div>
      
      {activUpdatePost?
      

      <Modal show={true} onHide={()=>setActivUpdatePost(false)}>
          <FormulaireAplication changObject={undefined} finishFunction={()=>{setActivUpdatePost(false);actualisationAllData()}} />
      </Modal>
          
          
          :<></>}
    {activLoading?Load(finishLoadingt):<></>}
    </div>
  );
};
