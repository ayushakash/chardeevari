import React from "react";
import ResponsiveDrawer from "../../Components/Drawer";
import ApexChart from "../../Components/Dashboard/ColumnBar";
import LineComponent from "../../Components/Dashboard/LineChart";

const AdminPanel = () => {
  const boxes = [
    {
      color: "#fff5e0",
      content: "Box 1",
    },
    {
      color: "#efe6f6",
      content: "Box 2",
    },
    {
      color: "#E0F8EA",
      content: "Box 3",
    },
    {
      color: "#FCEAE4",
      content: "Box 4",
    },
  ];

  function Box({ color, content }: any) {
    return (
      <div
        className={`col-6 col-sm-3 col-md-2 col-lg-2  rounded`}
        style={{ backgroundColor: `${color}` }}
      >
        {content}
      </div>
    );
  }
  return (
    <React.Fragment>
      <ResponsiveDrawer />
      <div className="row">
        <div className="col-lg-8 ">
          <div className="row justify-content-around " style={{ height: 150 }}>
            {boxes.map((box) => (
              <Box key={box.color} color={box.color} content={box.content} />
            ))}
          </div>
          <div className="row justify-content-between ">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 m-2 rounded">
              <ApexChart />
            </div>
          </div>
        </div>
        <div className="col-lg-4 ">
          <div className="row justify-content-center ">
            <div className="  mx-2 rounded shadow">
              {/* <LineComponent /> */}
              <ApexChart />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-9">
          <div className="row justify-content-between ">
            <div className="col-12 col-sm-2 col-md-6 col-lg-6  shadow ">
              <ApexChart />
            </div>
            <div className="col-12 col-sm-2 col-md-6 col-lg-6  shadow ">
              <ApexChart />
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="row justify-content-between ">
            <div className=" m-2 shadow">
              <ApexChart />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AdminPanel;
