// ProductTrackingModal.js
import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import EditIcon from '@mui/icons-material/Edit';
type ProductTrackingModalProps = {
  visible: boolean;
  onCancel: () => void; 
}
const ProductTrackingModal: React.FC<ProductTrackingModalProps> = ({ visible, onCancel }) => {
  const [isEditing, setEditing] = useState(false);
  const [columns, setColumns] = useState([
    { id: 'confirmationPending', title: 'Confirmation Pending', products: [] },
    { id: 'invoicePending', title: 'Invoice Pending', products: [] },
    { id: 'inProduction', title: 'In Production', products: [] },
    { id: 'readyForDelivery', title: 'Ready for Delivery', products: [] },
    { id: 'inTransit', title: 'In Transit', products: [] },
    { id: 'onWarehouse', title: 'On Warehouse', products: [] },
    { id: 'completed', title: 'Completed', products: [] },
  ]);
  const onDragEnd = (result:any) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    const updatedColumns = [...columns];
    const [movedItem] = updatedColumns[sourceIndex].products.splice(0, 1);
    updatedColumns[destinationIndex].products.push(movedItem);

    setColumns(updatedColumns);
  };

  const handleEditClick = () => {
    setEditing(!isEditing);
    // Additional logic for handling edit action
  };

  const handleCancelClick = () => {
    setEditing(false);
    onCancel();
    // Additional logic for handling cancel action
  };
  const data = [
    {
      status: 'Confirmation Pending',
      productName: 'Product Name 1',
      progress: 'HE',
      progressLabel: 'IL',
      steps: [
        { label: '11', completed: true },
        { label: '11', completed: true },
        { label: '11', completed: false },
        { label: '11', completed: false },
        { label: '11', completed: false },
      ],
      productName2: 'Product Name 7',
      status2: 'Completed',
    },
    // ... more data objects for other products
  ];
  return (
    <Modal
    width={1300}
    closable={false}
    className='custom-modal'
      title={<div className='d-flex fs-3 align-items-center justify-content-between ' style={{}}><p className='mb-0 font-weight-bold '>Product Tracking</p> 
      <div className="d-flex">
{isEditing===false?<>    
 <Button 
      className='px-2 py-1 '
      key="edit" type="ghost"  onClick={() => handleEditClick()}>
      <EditIcon className='mr-1' fontSize={'small'}/>Edit
    </Button>
    <Button 
    style={{paddingLeft:12,paddingRight:12}}
      className=' py-1 '
      key="edit" type="ghost"  onClick={() => onCancel()}>
      X
    </Button></>:<>
    <Button 
      className=' py-1 '
      key="edit" type="ghost"  onClick={() => onCancel()}>
      Cancel
    </Button>
    <Button 
      className='px-2 py-1 '
      key="edit" type="primary"  onClick={() => handleEditClick()}>
      Update
    </Button>
    </>}
   
 
        </div>
    </div>}
      visible={visible}
      onCancel={onCancel}
      
      footer={null}
    >
    
    
    <div className="row mt-3">
      <div className="col p-1">
        <div className='dashed-border border-gary text-center '>
          
          <p className='font-weight-bold p-2 mb-0 text-center '>Confirmation Pending</p>
          <div className='border-bottom'></div>
<Button className='my-1' style={{background:'#D3D3D3'}}>Product Name 1</Button>
<div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button>
<div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button><div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button><div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button><div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button><div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button><div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button><div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button><div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button>
<div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button><div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button><div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button>
        </div>
      </div>
      <div className="col p-1">
        <div className='dashed-border border-blue text-center '>
          
          <p className='font-weight-bold p-2 mb-0 text-center '>Invoice Pending</p>
          <div className='border-bottom'></div>
          <Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button>
<div className='border-bottom'></div>
<Button className='my-1' style={{background:'#ADD8E6'}}>Product Name 2</Button>
<div className='border-bottom'></div>

<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button><div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button><div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button><div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button><div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button><div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button><div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button><div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button>
<div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button><div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button><div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button>
        </div>
      </div>
      <div className="col p-1">
        <div className='dashed-border border-yellow text-center '>
          
          <p className='font-weight-bold p-2 mb-0 text-center '>In Production</p>
          <div className='border-bottom'></div>
          <Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button>
<div className='border-bottom'></div>


<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button><div className='border-bottom'></div>
<Button className='my-1' style={{background:'#EAEA4A'}}>Product Name 3</Button>
<div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button><div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button><div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button><div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button><div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button><div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button><div className='border-bottom'></div>
<Button className='my-1' style={{background:'#EAEA4A'}}>Product Name 8</Button>
<div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button><div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button><div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button>
        </div>
      </div>
 
      <div className="col p-1">
        <div className='dashed-border border-green text-center '>
          
          <p className='font-weight-bold p-2 mb-0 text-center '>Ready for Delivery</p>
          <div className='border-bottom'></div>
          <Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button>
<div className='border-bottom'></div>


<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button><div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button><div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button><div className='border-bottom'></div>
<Button className='my-1' style={{background:'#90EE90'}}>Product Name 6</Button>
<div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button><div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button><div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button><div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button><div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button><div className='border-bottom'></div>
<Button className='my-1' style={{background:'#90EE90'}}>Product Name 10</Button>
<div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button><div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button>
        </div>
      </div>
      <div className="col p-1">
        <div className='dashed-border border-orange text-center '>
          
          <p className='font-weight-bold p-2 mb-0 text-center '>In Transit</p>
          <div className='border-bottom'></div>
          <Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button>
<div className='border-bottom'></div>


<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button><div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button><div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button><div className='border-bottom'></div>
<Button className='my-1' style={{background:'#FFA500'}}>Product Name 5</Button>
<div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button><div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button><div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button><div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button><div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button>
<div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button>
<div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button><div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button>
        </div>
      </div>
      <div className="col p-1">
        <div className='dashed-border border-blue text-center '>
          
          <p className='font-weight-bold p-2 mb-0 text-center '>On Warehouse</p>
          <div className='border-bottom'></div>
          <Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button>
<div className='border-bottom'></div>
<Button className='my-1' style={{background:'#ADD8E6'}}>Product Name 4</Button>
<div className='border-bottom'></div>

<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button><div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button><div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button><div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button><div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button><div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button><div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button><div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button>
<div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button><div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button><div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button>
        </div>
      </div>
      <div className="col p-1">
        <div className='dashed-border border-green text-center '>
          
          <p className='font-weight-bold p-2 mb-0 text-center '>Completed</p>
          <div className='border-bottom'></div>
          <Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button>
<div className='border-bottom'></div>


<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button><div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button><div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button><div className='border-bottom'></div>
<Button className='my-1' style={{background:'#90EE90'}}>Product Name 6</Button>
<div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button><div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button><div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button><div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button><div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button><div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button><div className='border-bottom'></div>

<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button><div className='border-bottom'></div>
<Button className='my-2 hide  ' style={{visibility:'hidden'}}></Button>
        </div>
      </div>
    </div>
    </Modal>
  );
};

export default ProductTrackingModal;
