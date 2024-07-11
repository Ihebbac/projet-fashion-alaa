/* eslint-disable no-unused-expressions */
/* eslint-disable no-useless-computed-key */
/* eslint-disable no-useless-concat */
import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Radio,
  Row,
  Select,
  Space,
  Spin,
  Tag,
  Upload,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useEffect, useState } from "react";
import { notification } from "antd";
import axios from "axios";
import {
  MinusCircleOutlined,
  PlusOutlined,
  VerticalAlignTopOutlined,
} from "@ant-design/icons";
import { isNil, isEmpty, uniq } from "lodash";
import TextArea from "antd/lib/input/TextArea";
import { CirclePicker } from "react-color";

const ProduitModalAddEdit = (props) => {
  const { visible, onCancel } = props;
  const [Loading, setLoading] = useState(false);
  const [cat, setcat] = useState([]);
  const [images, setimages] = useState([]);
  const serverURL = "http://127.0.0.1:3003";

  const [form] = useForm();

  useEffect(() => {
    axios.get("http://localhost:3003/api/v1/categories").then((response) => {
      console.log("response", response);
      if (response.data.data) {
        setcat(response.data.data);
      } else {
        notification.error({ message: "No Data Found" });
      }
    });

    if (props.type === "EDIT") {
      form.setFieldsValue({
        categoryId: props?.record.categoryId,
        description: props?.record.description,
        detail: props?.record.detail,
        name: props?.record.name,
        createdAt: props?.record.createdAt,
        updatedAt: props?.record.createdAt,
        options: props?.record.option.map((el) => ({
          ...el,
          colors: el?.color,
          images: el?.images?.split(","),
          sizes: el?.size?.split(","),
          stock: el?.stock,
          price: el?.price,
          id: el.id,
        })),
      });

      let list = [];
      props?.record.option.forEach((el) => {
        list = [
          ...list,
          isEmpty(el?.images?.split(",")) ? [] : el?.images?.split(","),
        ];
      });

      console.log("list", list);
      setimages(list);
    } else {
      form.setFieldsValue({});
      setimages([]);
    }
  }, [form, props.record, props.visibl]);

  const handleChange = async (info, key) => {
    const oldimges = [...images];

    setLoading(true);
    try {
      const listOfPromise = [];
      info?.fileList?.forEach((el) => {
        if (!isNil(el?.originFileObj?.name)) {
          var bodyFormData = new FormData();

          bodyFormData.append("images", el?.originFileObj);

          if (!oldimges[key]) {
            oldimges[key] = [];
          }

          const Listimages = oldimges[key];

          Listimages.push("http://127.0.0.1:3003" + "/images/" + el?.name);
          console.log("oldimges", oldimges);

          setimages(oldimges);

          listOfPromise.push(
            axios({
              method: "post",
              url: "http://127.0.0.1:3003" + "/api/upload",
              data: bodyFormData,
              headers: { "Content-Type": "multipart/form-data" },
            })
          );
        }
      });
      await Promise.all(listOfPromise);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const handleonfinish = async (val) => {
    const config = {
      headers: {
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    };

    let user = JSON.parse(localStorage.getItem("user"));
    const values = {
      ...val,
      id: props.record.id,
    };

    const option = values?.options?.map((el, key) => ({
      ...el,
      images: images[key].join(","),
      sizes: el.sizes.join(","),
      price: Number(el.price),
      stock: Number(el.stock),
      color: el.colors,
      id: el?.id,
    }));

    if (props.type === "EDIT") {
      await axios
        .put("http://127.0.0.1:3003/api/v1/products/" + values.id, {
          name: values.name,
          description: values.description,
          detail: values.detail,
          categoryId: values.categoryId,
          option: option,
        })
        .then((response) => {
          notification.success({ message: "Update Done  " });
          props.refetech();
          onCancel();
        })
        .catch(function (err) {
          props.refetech();
          onCancel();
        });
    } else {
      await axios
        .post("http://127.0.0.1:3003/api/v1/products", {
          name: values.name,
          description: values.description,
          detail: values.detail,
          categoryId: values.categoryId,
          option: option,
        })
        .then((response) => {
          notification.success({ message: "Create Done  " });
          props.refetech();
          onCancel();
        })
        .catch(function (err) {
          props.refetech();
          onCancel();
        });
    }

    console.log("eeeeeeeeeeeeeeeee", values);
  };

  return (
    <Form
      form={form}
      onFinish={handleonfinish}
      preserve={props.type === "EDIT" ? true : false}
    >
      <div className="site-card-border-less-wrapper">
        <Modal
          title={props.type === "EDIT" ? "UPDATE" : "CREATE sssssss"}
          visible={visible}
          destroyOnClose
          onOk={() => {
            form.submit();
          }}
          width={1000}
          onCancel={onCancel}
        >
          <Card
            centered
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <Row justify="space-between" gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your name!",
                    },
                  ]}
                >
                  <Input placeholder="name" type="name" />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  name="categoryId"
                  rules={[
                    {
                      required: true,
                      message: "Please input your categoryId!",
                    },
                  ]}
                >
                  <Select
                    placeholder="category"
                    options={cat.map((el) => ({
                      value: el.id,
                      label: el.name,
                    }))}
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  name="detail"
                  rules={[
                    {
                      required: true,
                      message: "Please input your detail!",
                    },
                  ]}
                >
                  <TextArea placeholder="detail" type="detail" />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: "Please input your description!",
                    },
                  ]}
                >
                  <TextArea placeholder="description" type="textarea" />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.List name="options">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <>
                          <Row>
                            <Col
                              span={12}
                              style={{ marginRight: 10 }}
                              className="ms-1"
                            >
                              <Form.Item
                                {...restField}
                                name={[name, "colors"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Missing colors name",
                                  },
                                ]}
                              >
                                <CirclePicker
                                  colors={[
                                    "#D9E3F0",
                                    "#F47373",
                                    "#697689",
                                    "#37D67A",
                                    "#2CCCE4",
                                    "#555555",
                                    "#dce775",
                                    "#ff8a65",
                                    "#ba68c8",
                                    "#fff",
                                    "#000"

                                  ]}
                                  color={
                                    form.getFieldValue("options")[key].colors
                                  }
                                  onChangeComplete={(val) => {
                                    let oldOption =
                                      form.getFieldValue("options");
                                    oldOption[key] = {
                                      ...oldOption[key],
                                      colors: val.hex,
                                    };

                                    form.setFieldsValue("options", oldOption);
                                  }}
                                />
                              </Form.Item>
                            </Col>

                            <Col span={12} style={{ marginRight: 10 }}>
                              <Form.Item
                                {...restField}
                                name={[name, "sizes"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Missing sizes name",
                                  },
                                ]}
                              >
                                <Select
                                  mode="multiple"
                                  Tag
                                  options={[
                                    { value: "L", label: "L" },
                                    { value: "M", label: "M" },
                                    { value: "S", label: "S" },
                                    { value: "XL", label: "XL" },
                                    { value: "XXL", label: "XXL" },
                                    { value: "XXXL", label: "XXXL" },
                                  ]}
                                />
                              </Form.Item>
                            </Col>

                            <Col span={12} style={{ marginRight: 10 }}>
                              <Form.Item
                                {...restField}
                                name={[name, "price"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Missing price name",
                                  },
                                ]}
                              >
                                <Input placeholder="price" />
                              </Form.Item>
                            </Col>

                            <Col span={12} style={{ marginRight: 10 }}>
                              <Form.Item
                                {...restField}
                                name={[name, "stock"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Missing stock name",
                                  },
                                ]}
                              >
                                <Input placeholder="stock" />
                              </Form.Item>
                            </Col>
                          </Row>

                          <Row>
                            <Col md={12}>
                              <Form.Item shouldUpdate noStyle>
                                {({ getFieldValue }) => {
                                  return (
                                    <Form.Item
                                      name={[name, "images"]}
                                      {...restField}
                                    >
                                      <Upload
                                        className="avatar-uploader projects-uploader"
                                        onChange={(val) =>
                                          handleChange(val, key)
                                        }
                                        onRemove={(val) => {
                                          const oldimges = [...images];

                                          if (!isEmpty(oldimges[key])) {
                                            oldimges[key] = oldimges[
                                              key
                                            ].filter((el) => el !== val.name);

                                            setimages(oldimges);
                                          }
                                        }}
                                        onDrop={(val) => handleChange(val, key)}
                                        listType="picture-card"
                                        fileList={
                                          !isEmpty(images) &&
                                          !isNil(images) &&
                                          !isNil(images[key])
                                            ? images[key]?.map((el, i) => ({
                                                uid: -i,
                                                name: el,
                                                status: "done",
                                                url: el,
                                              }))
                                            : []
                                        }
                                        multiple={false}
                                      >
                                        <Button
                                          icon={
                                            <VerticalAlignTopOutlined
                                              style={{
                                                width: 20,
                                                color: "#000",
                                              }}
                                            />
                                          }
                                        >
                                          Upload Images
                                        </Button>
                                      </Upload>
                                    </Form.Item>
                                  );
                                }}
                              </Form.Item>
                            </Col>

                            <Col
                              span={6}
                              style={{ marginRight: 25, marginTop: 10 }}
                            >
                              <MinusCircleOutlined
                                onClick={() => remove(name)}
                                style={{ marginLeft: 40, marginTop: 10 }}
                              />
                            </Col>
                          </Row>

                          <hr></hr>
                        </>
                      ))}
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          block
                          icon={<PlusOutlined />}
                        >
                          Ajouter une Option
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Col>
            </Row>
          </Card>
        </Modal>
      </div>
    </Form>
  );
};

export default ProduitModalAddEdit;
