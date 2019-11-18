import React, { FunctionComponent } from "react";
import { Table, Divider, Button } from "antd";
import { ColumnProps } from "antd/lib/table/";
import { ShopData } from "./ExampleSearch";

interface RandomData {
  data: ShopData[];
  onEdit: (editData: ShopData) => void;
  onDelete: (deleteData: ShopData) => void;
}

export const ExampleTable: FunctionComponent<RandomData> = data => {
  const shopAction: FunctionComponent<ShopData> = (item: ShopData) => {
    return (
      <span>
        <Button type="primary" onClick={() => data.onEdit(item)}>
          Edit
        </Button>
        <Divider type="vertical" />
        <Button onClick={() => data.onDelete(item)}>Delete</Button>
      </span>
    );
  };
  const tableColumns: ColumnProps<ShopData>[] = [
    {
      title: "Login",
      dataIndex: "login"
    },
    {
      title: "Phone number",
      dataIndex: "phone"
    },
    {
      title: "First name",
      dataIndex: "name.first"
    },
    {
      title: "Last name",
      dataIndex: "name.last"
    },
    {
      title: "Campaign",
      dataIndex: "campaignCode",
      sorter: (a: ShopData, b: ShopData) => a.campaignCode - b.campaignCode,
      sortDirections: ["ascend", "descend"]
    },
    {
      title: "Cashback limit",
      dataIndex: "cashbackLimit",
      sorter: (a: ShopData, b: ShopData) => a.cashbackLimit - b.cashbackLimit,
      sortDirections: ["ascend", "descend"]
    },
    {
      title: "Company",
      dataIndex: "company"
    },
    {
      title: "Action",
      key: "action",
      render: shopAction
    }
  ];
  return <Table dataSource={data.data} columns={tableColumns} />;
};
