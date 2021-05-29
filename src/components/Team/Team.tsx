import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../redux/reducer";
import { async_func_data } from "../../redux/utils/helperfunctions";
import LabCard from "../LabCard/LabCard";

const Team = () => {
  const [labs, setLabs] = useState([]);

  const type = useSelector(
    (state: AppState) => state?.userReducer?.userData?.type
  );

  useEffect(() => {
    (async () => {
      const labs = await async_func_data(
        type === "student" ? "/api/student/labs" : "/api/faculty/labs",
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
