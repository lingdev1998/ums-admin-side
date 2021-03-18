import React, { useEffect, useState, useRef } from "react";
import { Button, Input, Space, Table ,Badge} from "antd";
import { PrinterFilled, SearchOutlined, ClearOutlined } from "@ant-design/icons";
import { api } from "Api";
import Highlighter from "react-highlight-words";
import moment from "moment";

const SalaryTableList = (props) => {
  function format(n) {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
      n,
    );
  }

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    size: "default",
  });

  function format(n) {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
      n,
    );
  }

  const [searchText, setSearchText] = useState("");

  const [searchedColumn, setSearchedColumn] = useState("");

  const searchInput = useRef(null);

  const getColumnSearchProps = (values) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Tìm theo ${values.columnName}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, values.dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, values.dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Tìm
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
            icon={<ClearOutlined />}
          >
            Xoá
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[values.dataIndex]
        ? record[values.dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === values.dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const columns = [
    {
      title: "Mã Đợt Lương",
      dataIndex: "id",
      align: "center",
      ...getColumnSearchProps({
        dataIndex: "id",
        columnName: "mã bảng lương",
      }),
    },
    {
      title: "Tên Đợt Lương",
      dataIndex: "salaryTableName",
      align: "center",
      render: (text, record) => (
        <a
          href="javascript:void(0)"
          onClick={() => {
            console.log(record);
            // props.setSelecting(record);
            props.setIsShowDetail(record);
          }}
        >
          {text}
        </a>
      ),
    },
    {
      title: "Ngày Bắt Đầu",
      align: "center",
      dataIndex: "startedDate",
      render: (text, record) => <span>{moment(text).format("DD.MM.YYYY")}</span>,
    },
    {
      title: "Ngày Kết Thúc",
      align: "center",
      dataIndex: "endDate",
      render: (text, record) => <span>{moment(text).format("DD.MM.YYYY")}</span>,
    },
    {
      title: "Tổng Lương",
      align: "center",
      dataIndex: "totalValue",
      render: (text, record) => <span>{format(text)}</span>,
    },
    {
      title: "Trạng Thái",
      align: "center",
      dataIndex: "status",
      render: (text, record) => {
        if (text === 0) {
          return <Badge status="warning" text="Chờ" />
        } else if (text === 1) {
          return <Badge status="processing" text="Đã xác nhận" />
        } else if (text === 2) {
          return <Badge status="success" text="Hoàn thành" />
        }
      },
    },
    {
      title: "Thao Tác",
      align: "center",
      render: (text, record) => (
        <>
          <Button
            type=""
            onClick={() => {
              props.handlePrintStudentInvoice(record, 1);
            }}
          >
            <PrinterFilled />
          </Button>
        </>
      ),
    },
  ];

  const handleChangeTable = (pagination) => {
    console.log(pagination);
    setPagination(pagination);
  };

  const onSelectChange = (selectedRowKeys) => {
    console.log(selectedRowKeys);
    props.setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys: props.selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          props.setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          props.setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={props.data}
        rowKey="id"
        bordered
        size="small"
        pagination={pagination}
        onChange={(paging) => handleChangeTable(paging)}
        showSizeChanger={true}
        rowSelection={rowSelection}
        onRow={(record, index) => {
          if (record.isSelecting === true)
            return { style: { background: "#4DC2F7", fontWeight: "bolder" } };
        }}
        locale={{
          emptyText: (
            <div className="ant-empty ant-empty-normal">
              <div className="ant-empty-image">
                <SearchOutlined style={{ fontSize: "16px", color: "#08c" }} />
                <p className="ant-empty-description">Không có kết quả nào</p>
              </div>
            </div>
          ),
        }}
      />
    </>
  );
};

export default SalaryTableList;
