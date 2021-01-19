/**
 * Module Dashboard
 */

import React, { useState, useEffect } from "react";
// page title bar
import { Tabs } from "antd"; 
import { api } from "Api";
import EducationProgramList from "Routes/EducationProgram/Programs/EducationProgramList"; 
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { setListBranch } from "Actions/EducationProgramActions";
import { NotificationManager } from "react-notifications";

const { TabPane } = Tabs;

export const EducationProgramHome = (props) => {
  const [tabChange, setChangeTab] = useState(false);

  useEffect(() => {
    // get list branch
    api
      .get("/branches", true)
      .then((res) => {
        props.setListBranch(res);
      })
      .catch((err) => { 
        if (error.message === "Forbidden") {
          NotificationManager.error(
            "Did you forget something? Please activate your account"
          );
        } else if (error.message === "Unauthorized") {
          throw new SubmissionError({ _error: "Username or Password Invalid" });
        }
      });
  }, []);

  return (
    <div className="data-table-wrapper">
      <Helmet>
        <title>Chương Trình Đào Tạo</title>
        <meta name="description" content="User Profile" />
      </Helmet>
 
      <EducationProgramList />
    </div>
  );
};

const mapStateToProps = ({ educationProgram }) => {
  return { educationProgram };
};

export default connect(
  mapStateToProps,
  {
    setListBranch,
  }
)(EducationProgramHome );
