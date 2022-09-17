
import React from 'react';
import Footer from '../Components/Footer';
import FormulaireAplication from '../Components/FormulaireAdd';
import NavbarHeader from '../Components/NavbarHeader';
import { TableEvent } from '../Components/TableEvent';
import { firstEvent, ProjectUrl } from '../constants';

const NewEvent = () => {
    return (
        <>

            {NavbarHeader(
                [
                    {name:"Modifier event",href: (ProjectUrl + "/modify-event")},
                    {name:"Créé un event",href: (ProjectUrl + "/new-event")}
                ],
                {name:"",href: (ProjectUrl + "/new-event")}
            )}

            <TableEvent colloneName={["Nom", "Place", "Represantant", "Type", "Date debut"]} title={'Liste evenment'} delet={false} modif={true} />
            <Footer/>
        </>
    );
};

export default NewEvent;