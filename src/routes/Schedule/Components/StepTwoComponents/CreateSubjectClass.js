import React, { useState, useEffect } from "react";
import {
  Result,
  Button,
  Modal,
  Tag,
  Table,
  Input,
  Form,
  Select,
  DatePicker,
  Badge,
  Space,
  Popconfirm,
  Slider,
  Switch,
  Statistic,
  Radio
} from "antd";
import { LockOutlined, SmileOutlined } from "@ant-design/icons";
import { api } from "Api";
import { NotificationManager } from "react-notifications";
import {
  PlusOutlined,
  SearchOutlined,
  CloseCircleOutlined,
  LockFilled,
  UnlockFilled,
  BranchesOutlined,
  DeleteFilled,
  RollbackOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { Row, Col } from "reactstrap";

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
};

const OpenSubjectClass = (props) => {
  const [form] = Form.useForm();

  const [totalNumberOfSeats, setTotalNumberOfSeats] = useState(0);

  const handleSubmitForm = (values) => {
    let subjectClassArr = [];
    for (var i = 0; i < values.numberOfGroup; i++) {
      let subjectClass = {};
      subjectClass.subjectClassId = props.term.id + props.subject.subjectId + i;
      subjectClass.subjectId = props.subject.subjectId;
      subjectClass.termId = props.term.id;
      subjectClass.numberOfSeats = values.numberOfSeats;
      subjectClass.isRequireLab = values.isRequireLab;
      subjectClassArr.push(subjectClass);
    }
    api
      .post("/subjectClasses", subjectClassArr, true)
      .then((res) => {
        NotificationManager.success("Tạo mới lớp học phần thành công.");
        props.getSubmittingInfo(props.term.id);
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
    props.setVisible(false);
  };

  return (
    <Modal
      title="Tạo mới lớp học phần"
      visible={props.visible}
      onOk={() => {
        let values = form.getFieldsValue();
        form.resetFields();
        console.log(values);
        handleSubmitForm(values);
      }}
      onCancel={() => {
        props.setVisible(false);
      }}
      okButtonProps={{
        icon: <CheckOutlined />,
        disabled: false,
        style: { width: "108px" },
      }}
      cancelButtonProps={{
        icon: <RollbackOutlined />,
        disabled: false,
        style: { width: "108px" },
      }}
      maskClosable={false}
      okText="Tạo Mới"
      cancelText="Đóng"
      destroyOnClose={true}
      centered
      closable={false}
      width={"40%"} 
    >
      <Form
        form={form}
        {...formItemLayout}
        initialValues={{
          numberOfSeats: props.subject.subjectType === "ONLYTHEORY" ? 45 : 30,
          isRequireLab:
            props.subject.subjectType === "ONLYPRACTICE" ||
            props.subject.subjectType === "BOTH"
              ? true
              : false,
          numberOfGroup: 0,
        }}
        onFieldsChange={(changedFields, allFields) => {}}
        preserve={false}
        onValuesChange={(changedValues, allValues) => {
          setTotalNumberOfSeats(
            form.getFieldValue("numberOfSeats") *
              form.getFieldValue("numberOfGroup")
          );
        }}
      >
        <Form.Item
          name="numberOfSeats"
          label="Sĩ số"
          // hasFeedback
          rules={[{ required: true, message: "Vui lòng chọn sĩ số!" }]}
        >
          <Slider
            min={15}
            max={props.subject.subjectType === "ONLYTHEORY" ? 90 : 45}
          />
        </Form.Item>
        <Form.Item
          name="numberOfGroup"
          label="Số nhóm"
          hasFeedback
          rules={[{ required: true, message: "Vui lòng điền số nhóm!" }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="isRequireLab"
          label="Yêu cầu phòng máy"
          // hasFeedback
          rules={[{ required: true, message: "Vui lòng chọn !" }]}
        >
         <Radio.Group>
            <Radio value={1}>Có</Radio>
            <Radio value={0}>Không</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>

      <Row gutter={16}>
        <Col span={12}>
          <Statistic
            title="Số lượng dự đoán"
            value={props.subject.predictSubmit}
            formatter={(values) => <span>{values + " sinh viên"}</span>}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Số lượng đăng ký"
            value={props.subject.totalSubmit}
            formatter={(values) => <span>{values + " sinh viên"}</span>}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Số lượng theo lớp học phần"
            value={totalNumberOfSeats}
            formatter={(values) => <span>{values + " sinh viên"}</span>}
          />
        </Col>
      </Row>
    </Modal>
  );
};

export default OpenSubjectClass;
