import { Modal,Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function SimpleModal({show,handleClose,message,itemName,action,buttonVariant}){
    return(
        <Modal show={show} onHide={() => handleClose()} >
        {/* <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
            <p className='h5'>
                <span className='ml-2'>
                    {message}
                </span>
            </p>
            <b className='ml-2' >
                {itemName}
            </b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() =>handleClose()}>
            Cancel
          </Button>
          <Button variant={buttonVariant} onClick={() =>handleClose(action)}>
            {action}
          </Button>
        </Modal.Footer>
      </Modal>
    )
}