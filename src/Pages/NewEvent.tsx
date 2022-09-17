
import React from 'react';
import Footer from '../Components/Footer';
import FormulaireAdd from '../Components/FormulaireAdd';
import NavbarHeader from '../Components/NavbarHeader';
import { TableEvent } from '../Components/TableEvent';
import { firstEvent, ProjectUrl } from '../constants';

const NewEvent = () => {
    return (
        <>

            {NavbarHeader(
                [
                    {name:"Modifier event",href: (ProjectUrl + "/modify-event")},
                    {name:"Créé un event",href: (ProjectUrl + "/new-event")},
                    {name:"recognition",href: (ProjectUrl + "/recognition")}
                ],
                {name:"",href: (ProjectUrl + "/new-event")}
            )}


            <FormulaireAdd changObject={undefined} finishFunction={function (): void {} }  />
            <Footer/>
        </>
    );
};

export default NewEvent;