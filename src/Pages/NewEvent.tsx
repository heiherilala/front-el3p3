import React from 'react';
import Footer from '../Components/Footer';
import FormulaireAplication from '../Components/FormulaireAplication';
import NavbarHeader from '../Components/NavbarHeader';
import { ProjectUrl } from '../constants';

const NewEvent = () => {
    return (
        <>

            {NavbarHeader(
                [
                    {name:"Listes des offres d’emplois",href: (ProjectUrl + "/list-job")},
                    {name:"Listes des candicatures",href: (ProjectUrl + "/application")}
                ],
                {name:"Offre d’emploi2",href: (ProjectUrl + "/")}
            )}


            <FormulaireAplication  idJobOffer={1}/>

            <Footer/>
        </>
    );
};

export default NewEvent;