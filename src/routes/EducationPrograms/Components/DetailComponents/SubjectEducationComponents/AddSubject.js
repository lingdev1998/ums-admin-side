import React, { useState, useEffect } from "react";
import { Modal, Form, Select, Input, Slider } from "antd";
import { NotificationManager } from "react-notifications";
import { api } from "Api";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
  initialValues: {
    branchId: undefined,
    branchName: undefined,
    educationProgramId: undefined,
    educationProgramLevel: undefined,
    educationProgramName: undefined,
    educationProgramStatus: undefined,
    educationProgramType: undefined,
    subjectList: [],
    totalTerm: undefined,
  },
};

export const AddSubjectModal = (props) => {
  const [form] = Form.useForm();

  const [correctBranchList, setCorrectBranchList] = useState([]);

  const [isAllowBranchField, setIsAllowBranchField] = useState(false);

  const handleSubmitForm = (values) => {
    console.log(values);
    api
      .post("/education-programs", values, true)
      .then((res) => {
        NotificationManager.success("Tạo mới kỳ học thành công.");
        props.getEducationProgramList();
      })
      .catch((error) => {
        console.log(error.response);
        NotificationManager.error(error.response.data.message);
        if (error.response.status === 403) {
          NotificationManager.error(
            "Did you forget something? Please activate your account"
          );
        } else if (error.response.status === "Lỗi xác thực") {
          throw new SubmissionError({ _error: "Username or Password Invalid" });
        }
      });
    props.onCancel();
  };

  function formatter(value) {
    return `${value} kỳ`;
  }

  return (
    <Modal
      title="Tạo Mới Chương Trình Đào Tạo"
      visible={props.visible}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            handleSubmitForm(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
      onCancel={() => {
        props.onCancel();
      }}
      okButtonProps={{ disabled: false }}
      cancelButtonProps={{ disabled: false }}
      maskClosable={false}
      okText="Tạo Mới"
      cancelText="Đóng"
      centered
      closable={false}
      width={"40%"}
    >
      <Form
        form={form}
        {...formItemLayout}
        onFieldsChange={(changedFields, allFields) => {}}
        preserve={false}
        onValuesChange={(changedValues, allValues) => {
          if(changedValues['departmentId']){
            setIsAllowBranchField(true)
          }
          else{
            setIsAllowBranchField(false)
          }
        }}
      >
         
      </Form>
    </Modal>
  );
};

export default AddSubjectModal;
