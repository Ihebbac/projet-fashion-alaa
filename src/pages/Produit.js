/*!
=========================================================
* Muse Ant Design Dashboard - v1.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import {
    Row,
    Col,
    Card,
    Radio,
    Table,
    Upload,
    message,
    Progress,
    Button,
    Avatar,
    Typography,
    Modal,
    Form,
    Input,
    
  } from "antd";
  import {
    DeleteTwoTone,
    EditTwoTone,
    InfoCircleOutlined,
    PlusOutlined,
    ExclamationCircleOutlined,
    UsergroupAddOutlined,
    CloseCircleTwoTone,
    PlusCircleTwoTone,
    UserOutlined,
    PhoneOutlined,
    MailOutlined,
   AppstoreAddOutlined ,
  } from "@ant-design/icons";
  import { ToTopOutlined } from "@ant-design/icons";
  import { Link } from "react-router-dom";
  import React, { Component, useEffect, useRef, useState } from "react";

  // Images
  import ava1 from "../assets/images/logo-shopify.svg";
  import ava2 from "../assets/images/logo-atlassian.svg";
  import ava3 from "../assets/images/logo-slack.svg";
  import ava5 from "../assets/images/logo-jira.svg";
  import ava6 from "../assets/images/logo-invision.svg";
  import face from "../assets/images/face-1.jpg";
  import face2 from "../assets/images/face-2.jpg";
  import face3 from "../assets/images/face-3.jpg";
  import face4 from "../assets/images/face-4.jpg";
  import face5 from "../assets/images/face-5.jpeg";
  import face6 from "../assets/images/face-6.jpeg";
  import pencil from "../assets/images/pencil.svg";
  
  const { Title } = Typography;
  const { confirm } = Modal;
  const formProps = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  // table code start
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  
  // project table start
  const project = [
    {
      title: "COMPANIES",
      dataIndex: "name",
      width: "32%",
    },
    {
      title: "BUDGET",
      dataIndex: "age",
    },
    {
      title: "STATUS",
      dataIndex: "address",
    },
    {
      title: "COMPLETION",
      dataIndex: "completion",
    },
   
  ];

  const dataproject = [
    {
      key: "1",
  
      name: (
        <>
          <Avatar.Group>
            <Avatar className="shape-avatar" src={ava1} size={25} alt="" />
            <div className="avatar-info">
              <Title level={5}>Spotify Version</Title>
            </div>
          </Avatar.Group>
        </>
      ),
      age: (
        <>
          <div className="semibold">$14,000</div>
        </>
      ),
      address: (
        <>
          <div className="text-sm">working</div>
        </>
      ),
      completion: (
        <>
          <div className="ant-progress-project">
            <Progress percent={30} size="small" />
            <span>
              <Link to="/">
                <img src={pencil} alt="" />
              </Link>
            </span>
          </div>
        </>
      ),
    },
  
    {
      key: "2",
      name: (
        <>
          <Avatar.Group>
            <Avatar className="shape-avatar" src={ava2} size={25} alt="" />
            <div className="avatar-info">
              <Title level={5}>Progress Track</Title>
            </div>
          </Avatar.Group>
        </>
      ),
      age: (
        <>
          <div className="semibold">$3,000</div>
        </>
      ),
      address: (
        <>
          <div className="text-sm">working</div>
        </>
      ),
      completion: (
        <>
          <div className="ant-progress-project">
            <Progress percent={10} size="small" />
            <span>
              <Link to="/">
                <img src={pencil} alt="" />
              </Link>
            </span>
          </div>
        </>
      ),
    },
  
    {
      key: "3",
      name: (
        <>
          <Avatar.Group>
            <Avatar className="shape-avatar" src={ava3} size={25} alt="" />
            <div className="avatar-info">
              <Title level={5}> Jira Platform Errors</Title>
            </div>
          </Avatar.Group>
        </>
      ),
      age: (
        <>
          <div className="semibold">Not Set</div>
        </>
      ),
      address: (
        <>
          <div className="text-sm">done</div>
        </>
      ),
      completion: (
        <>
          <div className="ant-progress-project">
            <Progress percent={100} size="small" format={() => "done"} />
            <span>
              <Link to="/">
                <img src={pencil} alt="" />
              </Link>
            </span>
          </div>
        </>
      ),
    },
  
    {
      key: "4",
      name: (
        <>
          <Avatar.Group>
            <Avatar className="shape-avatar" src={ava5} size={25} alt="" />
            <div className="avatar-info">
              <Title level={5}> Launch new Mobile App</Title>
            </div>
          </Avatar.Group>
        </>
      ),
      age: (
        <>
          <div className="semibold">$20,600</div>
        </>
      ),
      address: (
        <>
          <div className="text-sm">canceled</div>
        </>
      ),
      completion: (
        <>
          <div className="ant-progress-project">
            <Progress
              percent={50}
              size="small"
              status="exception"
              format={() => "50%"}
            />
            <span>
              <Link to="/">
                <img src={pencil} alt="" />
              </Link>
            </span>
          </div>
        </>
      ),
    },
  
    {
      key: "5",
      name: (
        <>
          <Avatar.Group>
            <Avatar className="shape-avatar" src={ava5} size={25} alt="" />
            <div className="avatar-info">
              <Title level={5}>Web Dev</Title>
            </div>
          </Avatar.Group>
        </>
      ),
      age: (
        <>
          <div className="semibold">$4,000</div>
        </>
      ),
      address: (
        <>
          <div className="text-sm">working</div>
        </>
      ),
      completion: (
        <>
          <div className="ant-progress-project">
            <Progress percent={80} size="small" />
            <span>
              <Link to="/">
                <img src={pencil} alt="" />
              </Link>
            </span>
          </div>
        </>
      ),
    },
  
    {
      key: "6",
      name: (
        <>
          <Avatar.Group>
            <Avatar className="shape-avatar" src={ava6} size={25} alt="" />
            <div className="avatar-info">
              <Title level={5}>Redesign Online Store</Title>
            </div>
          </Avatar.Group>
        </>
      ),
      age: (
        <>
          <div className="semibold">$2,000</div>
        </>
      ),
      address: (
        <>
          <div className="text-sm">canceled</div>
        </>
      ),
      completion: (
        <>
          <div className="ant-progress-project">
            <Progress percent={0} size="small" />
            <span>
              <Link to="/">
                <img src={pencil} alt="" />
              </Link>
            </span>
          </div>
        </>
      ),
    },
  ];
  
  const  Produit = () => {

    const onChange = (e) => console.log(`radio checked:${e.target.value}`);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([
      // {
      //   uid: '-1',
      //   name: 'image.png',
      //   status: 'done',
      //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      // },
      
    ]);
    const [Nom, setNom] = useState("");
    const [description, setdescription] = useState("");
    const [ThumbnailImage, setThumbnailImage] = useState("");
  
    const [createdAt, setcreatedAt] = useState("");
    const [updatedAt, setupdatedAt] = useState("");
    const [isModalCat, setIsModalCat] = useState(false);
    const [form] = Form.useForm();
    const showDetail = (values) => {
      console.log("get by id ", values);
     
    };
      const show = (dar) => {
      console.log("ihekkkkk", dar);
   
    };
    const showPromiseConfirm = (alldata,dataDelete) => {
      console.log('d',alldata)
      confirm({
        title: "Vous voulez supprimer "+ alldata.fullname+ "?",
        icon: <ExclamationCircleOutlined />,
        content:
          "lorsque vous appuillez sur ok l'utilisateur : " + alldata.fullname+" " +  " sera supprimer !",
    
        onOk() {
          console.log("Success", dataDelete);
         
            message.success("Catégorie supprimer avec succee..................");
            
        
        },
        onCancel() {},
      });
   
    };
    const showModalCat = () => {
      setIsModalCat(true);
    };
    const handleCancel = () => {
      setIsModalCat(false);
    };
    const handleCancelimg = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      console.log('iffff')
      file.preview = await getBase64(file.originFileObj);
    }
    console.log('!!!!!! iffff')
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  const style = {
    // background: '#0092ff',
    padding: '8px 0',
  };
    const columns = [
      {
        title: "Id du produit",
        dataIndex: "id",
        key: "id",
       
      },
      {
        title: "Nom",
        dataIndex: "name",
        key: "name",
       
      },
      {
        title: "Prix",
        dataIndex: "price",
        key: "price",
      },
    
      {
        title: "Quantité",
        key: "qty",
        dataIndex: "qty",
      },
      {
        title: "poucentage du Solde %",
        key: "discountPercent",
        dataIndex: "discountPercent",
      },
      {
        title: "Déscription",
        key: "description",
        dataIndex: "description",
      },
      {
        title: "Détail",
        key: "detail",
        dataIndex: "detail",
      },
      {
        title: "Catégorie",
        key: "categoryId",
        dataIndex: "categoryId",
      },
      {
        title: "stock",
        key: "stock",
        dataIndex: "stock",
      },
      {
        title: "createdAt",
        key: "createdAt",
        dataIndex: "createdAt",
      },
      {
        title: "updatedAt",
        key: "updatedAt",
        dataIndex: "updatedAt",
      },
   
     
      {
        title: "Action",
        key: "action",
        width: 300,
        render: (_, record) => (
          <div className="action-buttons">
               <Row >

        <Col  span={6} >  <Button   onClick={()=> show(record)}>
              <EditTwoTone />
            </Button></Col>
  
        <Col  span={6} > <Button type="primary " danger  onClick={()=> showPromiseConfirm(record,record.id)} >
              <DeleteTwoTone twoToneColor="#FFFFFF"  />
            </Button></Col>
            <Col  span={6}>      <Button  onClick={()=> showDetail(record)}  >
          <InfoCircleOutlined />
        </Button></Col>
      </Row>
          
           
          </div>
        ),
      },
    ];
    
    const data =[
        {
          id: 1,
          name: "T-shirt pour homme",
          price: 19.99,
          qty: 100,
          discountPercent: 10,
          description: "T-shirt en coton de haute qualité pour homme.",
          detail: "Disponible en plusieurs tailles et couleurs.",
          categoryId: 1,
          stock: 50,
        createdAt: "2024-01-01T12:00:00Z",
          updatedAt: "2024-01-15T12:00:00Z"
        },
        {
          "id": 2,
          "name": "Robe pour femme",
          "price": 49.99,
          "qty": 50,
          "discountPercent": 15,
          "description": "Robe élégante pour soirée pour femme.",
          "detail": "Matériau léger et confortable, disponible en plusieurs tailles.",
          "categoryId": 2,
          "stock": 20,
          "createdAt": "2024-02-01T12:00:00Z",
          "updatedAt": "2024-02-15T12:00:00Z"
        },
        {
          "id": 3,
          "name": "Veste pour enfant",
          "price": 29.99,
          "qty": 80,
          "discountPercent": 5,
          "description": "Veste chaude et confortable pour enfant.",
          "detail": "Doublure en polaire, disponible en plusieurs tailles.",
          "categoryId": 3,
          "stock": 30,
          "createdAt": "2024-03-01T12:00:00Z",
          "updatedAt": "2024-03-15T12:00:00Z"
        },
        {
            "id": 4,
            "name": "Jean pour homme",
            "price": 39.99,
            "qty": 150,
            "discountPercent": 20,
            "description": "Jean de qualité supérieure pour homme.",
            "detail": "Disponible en plusieurs tailles et couleurs.",
            "categoryId": 1,
            "stock": 75,
            "createdAt": "2024-01-10T12:00:00Z",
            "updatedAt": "2024-01-20T12:00:00Z"
          },
          {
            "id": 5,
            "name": "Jupe pour femme",
            "price": 29.99,
            "qty": 60,
            "discountPercent": 10,
            "description": "Jupe élégante pour femme.",
            "detail": "Matériau léger, disponible en plusieurs tailles.",
            "categoryId": 2,
            "stock": 30,
            "createdAt": "2024-02-10T12:00:00Z",
            "updatedAt": "2024-02-20T12:00:00Z"
          },
          {
            "id": 6,
            "name": "Pantalon pour enfant",
            "price": 24.99,
            "qty": 90,
            "discountPercent": 5,
            "description": "Pantalon confortable pour enfant.",
            "detail": "Disponible en plusieurs tailles et couleurs.",
            "categoryId": 3,
            "stock": 40,
            "createdAt": "2024-03-10T12:00:00Z",
            "updatedAt": "2024-03-20T12:00:00Z"
          },
          {
            "id": 7,
            "name": "Chemise pour homme",
            "price": 34.99,
            "qty": 120,
            "discountPercent": 15,
            "description": "Chemise élégante pour homme.",
            "detail": "Disponible en plusieurs tailles et couleurs.",
            "categoryId": 1,
            "stock": 60,
            "createdAt": "2024-01-20T12:00:00Z",
            "updatedAt": "2024-01-30T12:00:00Z"
          },
          {
            "id": 8,
            "name": "Blouse pour femme",
            "price": 44.99,
            "qty": 70,
            "discountPercent": 10,
            "description": "Blouse élégante pour femme.",
            "detail": "Matériau léger et confortable, disponible en plusieurs tailles.",
            "categoryId": 2,
            "stock": 35,
            "createdAt": "2024-02-20T12:00:00Z",
            "updatedAt": "2024-02-28T12:00:00Z"
          },
          {
            "id": 9,
            "name": "Pull pour enfant",
            "price": 19.99,
            "qty": 100,
            "discountPercent": 5,
            "description": "Pull chaud pour enfant.",
            "detail": "Doublure en polaire, disponible en plusieurs tailles.",
            "categoryId": 3,
            "stock": 50,
            "createdAt": "2024-03-20T12:00:00Z",
            "updatedAt": "2024-03-30T12:00:00Z"
          },
          {
            "id": 10,
            "name": "Chaussures pour homme",
            "price": 59.99,
            "qty": 200,
            "discountPercent": 25,
            "description": "Chaussures en cuir de haute qualité pour homme.",
            "detail": "Disponible en plusieurs tailles.",
            "categoryId": 1,
            "stock": 100,
            "createdAt": "2024-01-05T12:00:00Z",
            "updatedAt": "2024-01-15T12:00:00Z"
          },
          {
            "id": 11,
            "name": "Sandales pour femme",
            "price": 24.99,
            "qty": 80,
            "discountPercent": 10,
            "description": "Sandales élégantes pour femme.",
            "detail": "Disponible en plusieurs tailles.",
            "categoryId": 2,
            "stock": 40,
            "createdAt": "2024-02-05T12:00:00Z",
            "updatedAt": "2024-02-15T12:00:00Z"
          }
      ]
      
    return (
      <>
      <h1>Produit</h1>
        <div className="tabled">
          <Row gutter={[24, 0]}>
            <Col xs="24" xl={24}>
              <Card
                bordered={false}
                className="criclebox tablespace mb-24"
                title="Liste des produits"
                extra={
                  <>
               <Button type="primary" onClick={showModalCat}>Ajouter un produit</Button>
                  </>
                }
              >
                <div className="table-responsive">
                  <Table
                    columns={columns}
                    dataSource={data}
                    pagination={true}
                    className="ant-border-space"
                  />
                </div>
              </Card>
  
         
            </Col>
          </Row>
          <div>
          <Modal
          title={[
            <div
              style={{
                // backgroundColor: "#C8C1BF",
                color : "#2A1F69"
              }}
            >
              <AppstoreAddOutlined twoToneColor="#2A1F69" />
           
               Ajouter une nouvelle catégorie{" "}
            </div>,
          ]}
          visible={isModalCat}
          onCancel={handleCancel}
          footer={[
            <Row>
              <Col span={12} offset={6}>
                <Button 
                // onClick={handleOk2}
                >
                  <PlusCircleTwoTone /> Ajouter
                </Button>

                <Button danger 
                // onClick={handleCancel2}
                >
                  {" "}
                  <CloseCircleTwoTone twoToneColor="#FF0000" /> Annuler{" "}
                </Button>
              </Col>
            </Row>,
          ]}
          maskClosable={true}
          // onCancel={handleCancel2}
          width={500}
          centered
        >
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
            form={form}
          >
            <Form.Item
              label="Nom de la catégorie"
              name="name"
              rules={[
                {
                  required: true,
                  message: "veillez remplir le nom svp!",
                },
                {whitespace:true},
         {min:3}
              ]}
              hasFeedback
            >
              <Input size="small" 
              // defaultValue={nom} 
              allowClear 
              // onChange={handleChange} 
           />
            </Form.Item>

            <Form.Item
              label="Déscriprion"
              name="description"
              rules={[
                {
                  required: true,
                  message: "veillez remplir la déscription de la catégorie",
                },
                
              ]}
              hasFeedback
            >
              <Input size="small" 
              // defaultValue={tel} 
              allowClear 
              // onChange={handleChange} 
               />
            </Form.Item>
            <Form.Item
              label="ThumbnailImage"
              name="ThumbnailImage"
              rules={[
                {
                  required: true,
                  message: "veillez remplir le ThumbnailImage de la catégorie",
                },
                
              ]}
              hasFeedback
            >
            <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal visible={previewOpen} title={previewTitle} footer={null} onCancel={handleCancelimg}>
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
    </Form.Item>
          </Form>
        </Modal>
          </div>
        </div>
      </>
    );
  }

  export default Produit;
  