import { RouteComponentProps } from "@reach/router";
import { Col, Input, Layout, Modal, Row, Select, Typography } from "antd";
import Fuse from "fuse.js";
import React, { useState } from "react";
import "./App.css";
import { ExampleTable } from "./ExampleTable";
import locations from "./res/locations.json";
import originalData from "./res/random_data.json";

const { Option } = Select;
const { Search } = Input;

export type ShopData = {
  login: string;
  password: string;
  phone: string;
  campaignCode: number;
  cashbackLimit: number;
  name: {
    first: string;
    last: string;
  };
  company: string;
};
interface DataProps {
  dataSet: ShopData[];
  toDelete?: ShopData | null;
}

const ExampleSearch: React.FC<RouteComponentProps> = () => {
  // Search results
  const emptyData: DataProps = {
    dataSet: originalData,
    toDelete: null
  };
  const [data, setData] = useState(emptyData);

  const handleChange = (value: string) => {
    console.log("click ", value);
  };

  //drop down
  const options = [];
  for (const prefecture of locations.prefectures) {
    options.push(<Option key={prefecture.code}>{prefecture.name}</Option>);
  }

  // Search
  const fuse = new Fuse(data.dataSet, {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
      "name.first",
      "name.last",
      "company",
      "phone",
      "campaignCode",
      "cashbackLimit"
    ]
  });

  return (
    <Layout>
      <Layout.Content
        style={{
          background: "lightcyan",
          minHeight: 10,
          textAlign: "center",
          lineHeight: 10,
          whiteSpace: "nowrap"
        }}
      >
        <Typography.Text style={{ fontSize: 20, color: "black" }}>
          S E A R C H
        </Typography.Text>

        <Row>
          <Col>
            <Select
              defaultValue={options[0].key + ""}
              style={{ margin: 5, width: 100 }}
              onChange={handleChange}
            >
              {options}
            </Select>
            <Search
              placeholder="検索"
              onSearch={value => setData({ dataSet: fuse.search(value) })}
              style={{ margin: 5, width: 400 }}
            />
          </Col>
          <ExampleTable
            data={data.dataSet}
            onEdit={(editData: ShopData) => {
              console.log("edit", editData);
            }}
            onDelete={(deleteData: ShopData) => {
              setData({ dataSet: data.dataSet, toDelete: deleteData });
            }}
          />
        </Row>
        <Modal
          title="Delete item"
          visible={data.toDelete != null}
          onOk={() => {
            setData({
              dataSet: data.dataSet.filter(obj => {
                return obj != data.toDelete;
              })
            });
          }}
          onCancel={() => {
            setData({ dataSet: data.dataSet });
          }}
        >
          <p>Are you sure you want to delete item?</p>
        </Modal>
      </Layout.Content>
    </Layout>
  );
};

export default ExampleSearch;
