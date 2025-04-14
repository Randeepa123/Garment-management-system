import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import Person4Icon from "@mui/icons-material/Person4";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

function CircleIconBox({ icon }) {
  return (
    <Box
      sx={{
        backgroundColor: "#007ea4",
        width: 40,
        height: 40,
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
       
      }}
    >
      {icon}
    </Box>
  );
}

export const TopicBar = () => {
  return (
    <div className="topic-bar">
      <div className="user-info">
      <div className="left-section">
        <h2 className="stock-title">Stock</h2>
      </div>
        <CircleIconBox icon={<SettingsIcon sx={{ color: "white" }} />} />
        <CircleIconBox icon={<NotificationsIcon sx={{ color: "white" }} />} />
        <Divider orientation="vertical" flexItem sx={{ height: 50, mt: 2 }} />
        <CircleIconBox icon={<Person4Icon sx={{ color: "white" }} />} />
        <span className="user-name">Ishan Lahiru</span>
      </div>
    </div>
  );
};
