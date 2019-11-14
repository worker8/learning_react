import { RouteComponentProps } from "@reach/router";
import { Select, Layout, PageHeader, Input, Col, Row, Typography, List } from "antd";
import React, { useState } from "react";
import "./App.css";
import locations from "./res/locations.json"
import data from "./res/random_data.json"
import Fuse from "fuse.js";

const { Option } = Select;
const { Search } = Input;

type RandomData = {
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
}
const ExampleSearch: React.FC<RouteComponentProps> = () => {

  // Search results
  const emptyData: RandomData[] = [];
  const [results, setResults] = useState(emptyData);

  const handleChange = (value: String) => {
    console.log('click ', value);
  };

  //drop down
  var options = [];
  for (let prefecture of locations.prefectures) {
    options.push(<Option key={prefecture.code}>{prefecture.name}</Option>);
  }
  // Search
  var param = {
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
      "phone"
    ]
  };
  var fuse = new Fuse(data, param);
  console.log("Search results:", results);

  return (<Layout>
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
          <Select defaultValue={options[0].key + ""} style={{ margin: 5, width: 100 }} onChange={handleChange}>
            {options}
          </Select>
          <Search
            placeholder="検索"
            onSearch={value => setResults(fuse.search(value))}
            style={{ margin: 5, width: 400 }} />
        </Col>
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: page => {
              console.log("PAGE:", page);
            },
            pageSize: 5,
          }}
          bordered
          dataSource={results}
          renderItem={item => <List.Item onClick={() => { console.log(item) }}
          >
            <List.Item.Meta
              title={item.company}
            />
            {item.name.first + " " + item.name.last + " | " + item.phone}
          </List.Item>}
        />
      </Row>
    </Layout.Content>
  </Layout>);
}

export default ExampleSearch;
