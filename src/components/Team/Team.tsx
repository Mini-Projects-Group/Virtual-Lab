import React, { useEffect, useState } from "react";
import { async_func_data } from "../../redux/utils/helperfunctions";
import LabCard from "../LabCard/LabCard";

const Team = () => {
  const [labs, setLabs] = useState([]);

  useEffect(() => {
    (async () => {
      const labs = await async_func_data(
        "/api/faculty/labs",
        null,
        "get",
        true
      );

      setLabs(labs.data.results);
    })();
  }, []);

  //   console.log(labs);

  if (labs.length === 0) return <div>Loading...</div>;

  return (
    <div style={{ display: "flex" }}>
      {labs.map((item, key) => (
        <LabCard key={key} {...item} />
      ))}
    </div>
  );
};

export default Team;
