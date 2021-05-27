import { Card, Skeleton } from "antd";
import React, { useState } from "react";
import { LIGHT1, PRIMARY } from "../../reusables/constants";
import styles from "./LabCard.module.css";

const LabCard = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className={styles.root}>
      <Card
        title='Lab Name'
        style={{
          height: "100%",
          width: "100%",
          background: LIGHT1,
          borderRadius: "7px",
          color: PRIMARY,
        }}
      >
        <Skeleton loading={loading}>Main Content if any</Skeleton>
      </Card>
    </div>
  );
};

export default LabCard;
