import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { APIUrl, ProjectUrl } from '../constants';
import { getCurrentUser, logout } from '../hoooks';
import EventBus from '../hoooks/EventBus';
import { IUser } from '../interfaces';
import hei from '../assets/images/hei.png';

const NavbarHeader = (navList:{name:string,href:string}[],title:{name:string,href:string}) => {
    const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);

    useEffect(() => {
      const user = getCurrentUser();
  
      if (user) {
        setCurrentUser(user);
      }
  
      EventBus.on("logout", logOut);
  
      return () => {
        EventBus.remove("logout", logOut);
      };
    }, []);
  
    const logOut = () => {
      logout();
      setCurrentUser(undefined);
    };





    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light nav_perso ml-auto">
              <a className="navbar-brand" href={title.href}> <img src={hei} alt="logo" className=' sizimgNav'/>{title.name} </a>


              <div className="navbar-collapse" id="navbarSupportedContent">

                <form className="form-inline my-2 my-lg-0">
                  {currentUser ? (
                    <div className="navbar-nav ml-auto">
                      {navList.map((data,key)=>{return(
                        <li className="nav-item active">
                            <a className="nav-link" href={data.href}> {data.name}  <span className="sr-only">(current)</span></a>
                        </li>
                      )})}


                      <li className="nav-item  custom_color_logout">
                        <a href="/" className="nav-link bouttonColorConect" onClick={logOut}>
                          Se déconnecter
                        </a>
                      </li>
                    </div>
                  ) : (
                    <div className="navbar-nav ml-auto">
                      <li className="nav-item custom_color_logout bouttonColorConect" >
                        <Link to={"/login"} className="nav-link">
                          Se connecter
                        </Link>
                      </li>
                    </div>
                  )}
                </form>
              </div>
            </nav>
        </>
    );
};

export default NavbarHeader;



function setShowModeratorBoard(arg0: any) {
    throw new Error('Function not implemented.');
}

function setShowAdminBoard(arg0: any) {
    throw new Error('Function not implemented.');
}

