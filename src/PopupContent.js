import React from "react";
import { Descriptions, Badge } from "antd";

const PopupContent = props => {
  console.log("props.styleTitle", props.styleTitle);
  return (
    <Descriptions
      title={
        "Responsive Descriptions " + props.styleTitle + " " + props.content
      }
      bordered
      column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
    >
      <Descriptions.Item label="Product">Cloud Database</Descriptions.Item>
      <Descriptions.Item label="Billing">Prepaid</Descriptions.Item>
      <Descriptions.Item label="time">18:00:00</Descriptions.Item>
      <Descriptions.Item label="Amount">$80.00</Descriptions.Item>
      <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
      <Descriptions.Item label="Official">$60.00</Descriptions.Item>
      <Descriptions.Item label="Config Info">
        Data disk type: MongoDB
        <br />
        Database version: 3.4
        <br />
        Package: dds.mongo.mid
        <br />
        Storage space: 10 GB
        <br />
        Status: &nbsp; <Badge status="processing" text="Running" />
        <br />
        Region: East China 1
      </Descriptions.Item>
    </Descriptions>
  );
};

export default PopupContent;
