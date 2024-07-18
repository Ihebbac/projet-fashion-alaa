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
  notification,
  Carousel,
  Image,
  Badge,
  Alert,
  Space,
  Descriptions,
} from "antd";
import datetime from "moment";
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
  AppstoreAddOutlined,
} from "@ant-design/icons";
import { ToTopOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import React, { Component, useEffect, useRef, useState } from "react";
import axios from "axios";
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
import CategorieModalAddEdit from "./Modals/CategorieModalAddEdit.js";
import AddOrUpdateAdmin from "./Modals/AdminModalAddEdit.js";
import Text from "antd/lib/typography/Text.js";

const { Title } = Typography;
const { confirm } = Modal;

// table code start
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

// project table start

const Admins = () => {
  const onChange = (e) => console.log(`radio checked:${e.target.value}`);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [show1, setshow1] = useState(false);
  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);
  const [Nom, setNom] = useState("");
  const [description, setdescription] = useState("");
  const [ThumbnailImage, setThumbnailImage] = useState("");
  const [data, setData] = useState([]);
  const [refetech, setrefetech] = useState(false);
  const [isload, setisload] = useState(true);
  const [createdAt, setcreatedAt] = useState("");
  const [updatedAt, setupdatedAt] = useState("");
  const [isModalCat, setIsModalCat] = useState(false);

  const [visible, setVisible] = useState(false);
  const [action, setAction] = useState("");
  const [record, setrecord] = useState({});

  const [form] = Form.useForm();
  const handrefetech = () => {
    setrefetech(!refetech);
  };

  const showDetail = (values) => {
    console.log("get by id ", values);
  };
  const show = (dar) => {
    console.log("ihekkkkk", dar);
  };

  const showPromiseConfirm = (alldata, dataDelete) => {
    console.log("d", alldata);
    confirm({
      title: "Vous voulez supprimer " + alldata.name + "?",
      icon: <ExclamationCircleOutlined />,
      content:
        "lorsque vous appuillez sur ok la catégorie : " +
        alldata.name +
        " " +
        " sera supprimer !",

      async onOk() {
        console.log("Success delete ", dataDelete);
        setisload(true);
        await axios
          .delete(`http://localhost:3003/api/v1/categories/${alldata.id}`)
          .then(function (response) {
            handrefetech();
            setisload(false);
          })
          .catch(function (err) {
            console.log(err);
            setisload(false);
          });
        message.success("Catégorie supprimer avec succee..................");
      },
      onCancel() {},
    });
  };
console.log('record' , record)
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

  const columns = [
    { title: "Id", dataIndex: "id", key: "id" },
    {
      title: "Nom d'utilisateur",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ellipsis: true,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },

    {
      title: "Status du compte",
      key: "active",
      dataIndex: "active",
      ellipsis: true,
      render: (text) => {
        if (text === true) {
          return<>
          <Badge
          className="site-badge-count-109"
          count={"Activé"}
          style={{ backgroundColor: '#52c41a' }}
        /></> 
        } else {
          return   <Badge
          className="site-badge-count-109"
          count={"Suspendu"}
        
          style={{ backgroundColor: '#f5222d' }}
        />;
        }
      },
    },
    {
      title: "createdAt",
      key: "createdAt",
      dataIndex: "createdAt",
      render: (x) => {
        const dateObject = datetime(x);

        const formattedDate = dateObject.format("DD/MM/YYYY");
        return <time>{formattedDate}</time>;
      },
    },
    {
      title: "updatedAt",
      key: "updatedAt",
      dataIndex: "updatedAt",
      render: (x) => {
        if (!x) {
          return (
            <Badge
              className="site-badge-count-109"
              style={{}}
              status="processing"
              text="Non modifié"
            />
          );
        }

        const dateObject = datetime(x);
        const formattedDate = dateObject.format("DD/MM/YYYY");
        return <time>{formattedDate}</time>;
      },
    },
    {
      title: "Action",
      key: "action",
      width: 200,
      fixed: "right",
      render: (_, record) => (
        <div className="action-buttons">
          <Row>
            <Col span={12} className="ms-2">
              {" "}
              <Button
                onClick={() => {
                  setVisible(true);
                  setrecord(record);
                  setAction("EDIT");
                }}
              >
                <EditTwoTone />
              </Button>
            </Col>
            <Col span={12} className="ms-2">
              {" "}
              <Button
                onClick={() => {
                  setIsModalOpen(true);
                  console.log("Admin record detail", record);
                  setrecord(record);
                  // setrecordOption(record?.option);
                  // setoptionColor(record?.option[0].color);
                }}
              >
                <InfoCircleOutlined />
              </Button>
            </Col>
            {/* <Col span={8} className="ms-2">
              {" "}
              <Button
                type="primary "
                danger
                onClick={() => showPromiseConfirm(record, record.id)}
              >
                <DeleteTwoTone twoToneColor="#FFFFFF" />
              </Button>
            </Col> */}
          </Row>
        </div>
      ),
    },
  ];

  useEffect(() => {
    axios.get("http://localhost:3003/api/v1/admins").then((response) => {
      console.log("Admins", response);
      if (response.data.data) {
        setData(response.data.data);
        setisload(false);
      } else {
        notification.error({ message: "No Data Found" });
        setisload(false);
      }
    });
  }, [refetech]);
  const onFinish = async (values) => {
    setisload(true);
    console.log("valuesssssss", values);
    // const res = await axios
    // .post(`http://localhost:3003/api/v1/categories/${values}`)
    // .then(function (response) {
    //   // handrefetech();
    //   setisload(false);
    // })
    // .catch(function (err) {
    //   console.log(err);
    //   setisload(false);
    // });

    // console.log("data received:", res);
    form.resetFields();
  };
  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              loading={isload}
              className="criclebox tablespace mb-24"
              title="Liste des catégories"
              extra={
                <>
                  <Button
                    type="primary"
                    onClick={() => {
                      setVisible(true);
                      setrecord({});
                      setAction("ADD");
                    }}
                  >
                    Ajouter un utilisateur
                  </Button>
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
        <AddOrUpdateAdmin
          visible={visible}
          record={action === "EDIT" ? record : {}}
          refetech={handrefetech}
          type={action}
          onCancel={() => setVisible(false)}
        />
      </div>

      <Modal
        visible={show1}
        destroyOnClose
        width={1000}
        footer={false}
        onCancel={() => setshow1(false)}
      >
        {record && (
          <Card>
            <Row>
              <Col span={12}>
                <div className="ant-row-flex ant-row-flex-center">
                  <Carousel autoplay>
                    {record.thumbnailImage?.split(",").map((el, index) => (
                      <Image src={el} width={"90%"} key={index} />
                    ))}
                  </Carousel>
                </div>
              </Col>
              <Col span={12}>
                <h1>
                  <strong>{record?.name}</strong>
                </h1>
                <hr />
                <p>
                  <strong>{record?.description}</strong>
                </p>
              </Col>
            </Row>
          </Card>
        )}
      </Modal>
      <Modal
          title="Détail de l'utilisateur"
          visible={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={false}
        >
          <Space  direction="vertical"
    // size="middle"
    style={{
      display: 'flex',
    }}
    >
          
            {" "}
            <Descriptions bordered >
           
              <Descriptions.Item label="Nom d'utilisateur:" span={3}>
                {" "}
                <Avatar
      style={{
        backgroundColor: '#87d068',
      }}
      icon={<UserOutlined />}
    />
                <Text keyboard>{record?.username}</Text>
              </Descriptions.Item >
              <Descriptions.Item label="Email:" span={3}>
              {record.email ? record.email : <Badge
        className="site-badge-count-109"
        count='non renseigné'
        style={{
          backgroundColor: '#f5222d',
        }}
      />}
              </Descriptions.Item>
              
              <Descriptions.Item label="Role:" span={3}>
              {record?.role}
              </Descriptions.Item>
              <Descriptions.Item label="Status:" span={3}>
              {record?.active ? (
    <Badge
      className="site-badge-count-109"
      count="Activé"
      style={{ backgroundColor: '#52c41a' }}
    />
  ) : (
    <Badge
      className="site-badge-count-109"
      count="Suspendu"
      style={{ backgroundColor: '#f5222d' }}
    />
  )}
 
    </Descriptions.Item>
             
            </Descriptions>
          </Space>
        </Modal>
    </>
  );
};

export default Admins;