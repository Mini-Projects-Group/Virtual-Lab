import { Card, Skeleton } from "antd";
import React, { useState } from "react";
import { LIGHT1, PRIMARY } from "../../reusables/constants";
import { useHistory } from "react-router";
import styles from "./LabCard.module.css";

const LabCard = (data) => {
  const [loading, setLoading] = useState(false);

  const { _id, batch, branch, subject } = data;
  const history = useHistory();
  //   console.log(data);

  const handleClick = () => {
    console.log("clicked " + _id);

    history.push(`/lab/${_id}`);
  };

  return (
    <div className={styles.root}>
      <Card
        title={subject}
        style={{
          height: "100%",
          width: "100%",
          background: LIGHT1,
          borderRadius: "7px",
          color: PRIMARY,
        }}
        onClick={handleClick}
      >
        <Skeleton loading={!data ? true : false}>
          <p>Batch : {batch}</p>
          <p>Branch : {branch}</p>
          <p>Batch ID : {_id}</p>
        </Skeleton>
      </Card>
    </div>
  );
};

export default LabCard;
