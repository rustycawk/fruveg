import React, { useState } from 'react'
import { ReactComponent as ImagesIcon } from '../../../shared/icons/Images.svg'
import { Button, Modal } from 'react-bootstrap';
import { IProduct } from '../../../types/products/IProduct';
import ImageToggle from '../../../components/ImageToggle';
import productService from '../../../services/product-service';

type Props = {
  product: IProduct
  update: () => void
}

const Index = (props: Props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const [files, setFiles] = useState<FileList | null>(null)

  const appendImage = ()=>{
    if(files && files.length > 0) {
      for(let i=0;i<files.length;i++) {
        var fd = new FormData()
        fd.append('image', files[i])
        productService.appendImage(fd,props.product.id).then((response)=>{
          console.log(response)
          props.update()
        }).catch((error)=>{
          console.log(error)
        })
      }
    }
  }

  const deleteImage = (id:number)=>{
    productService.deleteImage(id).then((response)=>{
      props.update()
    }).catch((error)=>{
      console.log(error)
    })
  }

  return (
    <>
      <Button variant="warning" size={'sm'} onClick={handleShow}>
        <ImagesIcon width={16} height={16} />
      </Button>

      <Modal show={show} size='lg' onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Редактирование картинок продукта</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-wrap" style={{ gap: 10 }}>
            {
              props.product.images?.map((image) => {
                return <div className='p-1 border rounded d-flex flex-column' style={{ gap: 10 }}>
                  <ImageToggle
                    key={image.id}
                    title={props.product.article + image.id}
                    src={image.path}
                    className='border rounded'
                    style={{ width: 100, aspectRatio: '1 / 1', objectFit:'contain' }}
                  />
                  <Button variant="danger" onClick={()=>deleteImage(image.id)} size={'sm'}>Удалить</Button>
                </div>
              })
            }
          </div>
          <div className='mt-3'>
            <label className='form-label'>Добавить картинки</label>
            <input type="file" onChange={(e) => setFiles(e.target.files)} className='form-control mb-3' multiple />
            <Button variant="success" onClick={()=>appendImage()} size={'sm'}>+ Добавить</Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Index