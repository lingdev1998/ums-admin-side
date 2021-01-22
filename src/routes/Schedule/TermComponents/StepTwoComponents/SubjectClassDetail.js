import React from "react";
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  DatePicker,
  List,
  Avatar,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const SubjectClassDetail = (props) => {
  const data = [
    {
      title: "Ant Design Title 1",
    },
    {
      title: "Ant Design Title 2",
    },
    {
      title: "Ant Design Title 3",
    },
    {
      title: "Ant Design Title 4",
    },
  ];
  return (
    <>
      <Drawer
        title="Thông tin chi tiết lớp học phần"
        width={720}
        onClose={() => props.setPageStatus(1)}
        visible={props.visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Button
              onClick={() => props.setPageStatus(1)}
              style={{ marginRight: 8 }}
            >
              Đóng
            </Button>
            <Button onClick={() => props.setPageStatus(1)} type="primary">
              Đóng
            </Button>
          </div>
        }
      >
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={<a href="https://ant.design">{item.title}</a>}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
            </List.Item>
          )}
        />
        ,
      </Drawer>
    </>
  );
};

export default SubjectClassDetail;
