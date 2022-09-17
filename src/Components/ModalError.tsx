import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


interface props {
  title:string,
  corps: string;
  finish: ()=>void;
}

const ModalError: React.FC<props> = (props) => {

  return (
    <>
      <Modal className='colorModel' show={true} onHide={props.finish}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p> {props.corps} </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className='custom_color_refuse' onClick={props.finish}>
            OK
          </Button> 
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalError;