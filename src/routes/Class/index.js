import { api } from "Api";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { NotificationManager } from "react-notifications";
import YearClassList from "./YearClassList";
import YearClassCreate from "./YearClassCreate";
import YearClassUpdate from "./YearClassUpdate";
import YearClassDetails from "./YearClassDetails";
import moment from "moment";

// import SubjectImport from './Import';
import { Col, Row } from "reactstrap";
import {
  PlusOutlined,
  SearchOutlined,
  DeleteOutlined,
  DiffOutlined,
  VerticalAlignBottomOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Button, Input, Alert, Modal } from "antd";
import RctPageLoader from "Components/RctPageLoader/RctPageLoader";

const { confirm } = Modal;

export const YearClassHome = (props) => {
  const [currentTitle, setCurrentTitle] = useState("Danh sách Lớp niên khoá");

  const [showModalCreate, setShowModalCreate] = useState(false);

  const [showModalImport, setShowModalImport] = useState(false);

  const [showModalUpdate, setShowModalUpdate] = useState(false);

  const [yearClassList, setYearClassList] = useState([]);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [departmentList, setDepartmentList] = useState([]);

  const [showDetails, setShowDetails] = useState(false);

  const [brachList, setBranchList] = useState([]);

  const [loading, setLoading] = useState(true);

  const [employeeList, setEmployeeList] = useState([]);

  const onSearch = () => {};

  const showErrNoti = (err) => {
    NotificationManager.error(err.response.data.message);
    if (err.message === "Forbidden") {
      NotificationManager.error("Did you forget something? Please activate your account");
    } else if (err.message === "Unauthorized") {
      throw new SubmissionError({ _err: "Username or Password Invalid" });
    }
  };

  const setSelecting = (record) => {
    let newList = yearClassList;
    for (var i = 0; i < newList.length; i++) {
      if (record.classId === newList[i].classId) {
        newList[i].isSelecting = true;
      }
    }
    setYearClassList(newList);
    setShowDetails(record);
  };

  const deSelecting = () => {
    let newList = yearClassList;
    for (var i = 0; i < newList.length; i++) {
      newList[i].isSelecting = false;
    }
    setYearClassList(newList);
    setShowDetails(false);
  };

  const getYearClassList = () => {
    api
      .get("/yearClasses", true)
      .then((res) => {
        setYearClassList(res);
        setLoading(false);
      })
      .catch((err) => {
        showErrNoti(err);
      });
  };

  const getDepartmentList = () => {
    api
      .get("/departments", true)
      .then((res) => {
        setDepartmentList(res);
      })
      .catch((err) => {
        showErrNoti(err);
      });
  };

  const getTeacherList = () => {
    api
      .get("/employee")
      .then((res) => {
        setEmployeeList(res);
      })
      .catch((err) => {
        showErrNoti(err);
      });
  };

  const handleSubmitForm = (values) => {
    let object = {};
    object.departmentId = values.departmentId;
    object.startYear = moment(values.rangeTime[0]).year();
    object.endYear = moment(values.rangeTime[1]).year();
    object.educationProgramLevel = values.educationProgramLevel;
    object.teacherId = values.teacherId;
    console.log(object);
    api
      .post("/yearClasses", object, true)
      .then((res) => {
        NotificationManager.success(`Tạo mới ${res} lớp niên khoá.`);
        getYearClassList();
      })
      .catch((err) => {
        showErrNoti(err);
      });
    setShowModalCreate(false);
  };

  const handleDeleteRecord = (id) => {
    api
      .delete(`/yearClasses/${id}`, true)
      .then((res) => {
        NotificationManager.success("Đã xoá" + res + " bản ghi");
        getYearClassList();
      })
      .catch((err) => {
        showErrNoti(err);
      });
  };

  const handleDeleteMultipleRecord = (values) => {
    api
      .delete(`/subjects?${values.map((value, index) => `ids=${value}`).join("&")}`, true)
      .then((res) => {
        NotificationManager.success("Đã xoá" + res + " bản ghi");
        getYearClassList();
        setSelectedRowKeys([]);
      })
      .catch((err) => {
        showErrNoti(err);
      });
  };

  const showDeleteConfirm = (selectedRowKeys) => {
    confirm({
      centered: true,
      title: "Chắc chắn?",
      icon: <ExclamationCircleOutlined />,
      content: "Vui lòng xác nhận",
      okText: "Đồng ý",
      okType: "danger",
      cancelText: "Huỷ",
      onOk() {
        handleDeleteMultipleRecord(selectedRowKeys);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  useEffect(() => {
    getYearClassList();
    getDepartmentList();
    getTeacherList();
  }, []);

  if (loading) {
    return (
      <>
        <RctPageLoader />
      </>
    );
  } else
    return (
      <div className="data-table-wrapper">
        <Helmet>
          <title>Lớp Niên Khoá</title>
          <meta name="description" content="Danh Sách Giảng Viên" />
        </Helmet>
        <div className="rct-block ">
          <div className="rct-block-title ">
            <h4>
              <span>{currentTitle}</span>{" "}
            </h4>
            <div className="contextual-link" style={{ top: "15px" }}></div>
          </div>
          <div className="collapse show">
            <div className="rct-full-block">
              <hr style={{ margin: "0px" }} />
              <div className="table-responsive">
                <Row>
                  <Col md={12} sm={12} xs={12}>
                    <div
                      className="tableListOperator"
                      style={{ textAlign: "right", width: "100%" }}
                    >
                      <Button
                        type="primary"
                        style={{
                          background: "#448AE2",
                          borderColor: "#448AE2",
                          width: "180px",
                        }}
                        onClick={() => setShowModalCreate(true)}
                      >
                        <PlusOutlined></PlusOutlined>
                        <span>Tạo Mới </span>
                      </Button>
                    </div>
                  </Col>
                </Row>
                <YearClassList
                  setSelecting={setSelecting}
                  setCurrentTitle={setCurrentTitle}
                  handleDeleteRecord={handleDeleteRecord}
                  data={yearClassList}
                  setShowModalUpdate={setShowModalUpdate}
                  selectedRowKeys={selectedRowKeys}
                  setSelectedRowKeys={setSelectedRowKeys}
                  setShowDetails={setShowDetails}
                />
              </div>

              <YearClassCreate
                visible={showModalCreate}
                setShowModalCreate={setShowModalCreate}
                getYearClassList={getYearClassList}
                departmentList={departmentList}
                handleSubmitForm={handleSubmitForm}
                employeeList={employeeList}
                // options={prerequisitesSubject}
              />
              <YearClassUpdate
                visible={showModalUpdate}
                setShowModalUpdate={setShowModalUpdate}
                yearClassList={yearClassList}
                departmentList={departmentList}
                getYearClassList={getYearClassList}
                employeeList={employeeList}
                // options={prerequisitesSubject}
              />
              <YearClassDetails
                visible={showDetails}
                setShowDetails={setShowDetails}
                deSelecting={deSelecting}
              />
              {/*
              <SubjectImport
                visible={showModalImport}
                setShowModalImport={setShowModalImport}
                setRecordUpdate={setRecordUpdate}
                record={recordUpdate}
                yearClassList={yearClassList}
                departmentList={departmentList}
                getYearClassList={getYearClassList}
                // options={prerequisitesSubject}
              /> */}
            </div>
          </div>
        </div>
      </div>
    );
};

export default YearClassHome;
