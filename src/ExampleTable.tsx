import React, { FunctionComponent } from 'react';
import { Table, Divider, Button } from "antd";
import { ColumnProps } from "antd/lib/table/";
import { RandomData } from "./ExampleSearch"

interface IRandomData {
  data: RandomData[],
  onEdit: (editData: RandomData) => void
  onDelete: (deleteData: RandomData) => void
}

export const ExampleTable: FunctionComponent<IRandomData> = (data) => {
  const tableColumns: ColumnProps<RandomData>[] = [
    {
      title: "Login",
      dataIndex: "login",
    },
    {
      title: "Phone number",
      dataIndex: "phone",
    },
    {
      title: "First name",
      dataIndex: "name.first",
    },
    {
      title: "Last name",
      dataIndex: "name.last",
    },
    {
      title: "Campaign",
      dataIndex: "campaignCode",
      sorter: (a: RandomData, b: RandomData) => a.campaignCode - b.campaignCode,
      sortDirections: ['ascend', 'descend']
    },
    {
      title: "Cashback limit",
      dataIndex: "cashbackLimit",
      sorter: (a: RandomData, b: RandomData) => a.cashbackLimit - b.cashbackLimit,
      sortDirections: ['ascend', 'descend']
    },
    {
      title: "Company",
      dataIndex: "company",
    },
    {
      title: 'Action',
      key: 'action',
      render: (item: RandomData) => (
        <span>
          <Button type="primary" onClick={() => data.onEdit(item)}>
            Edit
        </Button>
          <Divider type="vertical" />
          <Button onClick={() => data.onDelete(item)}>
            Delete
        </Button>
        </span>
      ),
    },
  ];
  return <Table dataSource={data.data} columns={tableColumns} />;
};
