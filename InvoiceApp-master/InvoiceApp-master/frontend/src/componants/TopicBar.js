import React from "react";
import { useNavigate } from "react-router-dom";

//icons
import SettingsIcon from "@mui/icons-material/Settings";
import Person4Icon from "@mui/icons-material/Person4";
import LogoutIcon from "@mui/icons-material/Logout";
//ui componants
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import NotificationsIcon from "@mui/icons-material/Notifications";

function CircleIconBox({ icon, color = "white", onClick }) {
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
        cursor: onClick ? "pointer" : "default",
      }}
      onClick={onClick}
    >
      {icon}
    </Box>
  );
}

export const TopicBar = (props) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // Use location.href instead of navigate + reload
  };

  return (
    <div className="d-flex justify-content-between m-4 top-heading">
      <h2>{props.text}</h2>
      <div className="d-flex gap-3">
        <CircleIconBox icon={<SettingsIcon sx={{ color: "white" }} />} />
        <CircleIconBox icon={<NotificationsIcon sx={{ color: "white" }} />} />
        <Divider orientation="vertical" flexItem sx={{ height: 40 }} />
        <CircleIconBox icon={<Person4Icon sx={{ color: "white" }} />} />
        <span className="align-self-center">{props.userName}</span>
        <CircleIconBox
          icon={<LogoutIcon sx={{ color: "white" }} />}
          onClick={handleSignOut}
        />
      </div>
    </div>
  );
};
