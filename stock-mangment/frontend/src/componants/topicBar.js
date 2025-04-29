import React, { useState, useEffect } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import Person4Icon from "@mui/icons-material/Person4";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import axios from "axios";

function CircleIconBox({ icon, onClick }) {
  return (
    <Box
      onClick={onClick}
      sx={{
        backgroundColor: "#007ea4",
        width: 40,
        height: 40,
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: onClick ? "pointer" : "default", // Show pointer if clickable
      }}
    >
      {icon}
    </Box>
  );
}

export const TopicBar = () => {
  const [notifications, setNotifications] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get('http://localhost:8070/api/notifications');
      setNotifications(res.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000); // Fetch every 10s
    return () => clearInterval(interval);
  }, []);

  const unseenCount = notifications.filter(n => !n.read).length;

  const handleNotificationClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = async () => {
    setAnchorEl(null);

    // Mark all unseen notifications as read
    try {
      const unseen = notifications.filter(n => !n.read);
      for (const notif of unseen) {
        await axios.put(`http://localhost:8070/api/notifications/read/${notif._id}`);
      }
      fetchNotifications(); // Refresh after marking
    } catch (error) {
      console.error('Error marking notifications as read:', error);
    }
  };

  return (
    <div className="topic-bar">
      <div className="user-info">
        <div className="left-section">
          <h2 className="stock-title">Stock</h2>
        </div>

        <CircleIconBox icon={<SettingsIcon sx={{ color: "white" }} />} />

        <Box sx={{ position: "relative" }}>
          <IconButton onClick={handleNotificationClick} sx={{ padding: 0 }}>
            <Badge badgeContent={unseenCount} color="error">
              <CircleIconBox icon={<NotificationsIcon sx={{ color: "white" }} />} />
            </Badge>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              style: {
                maxHeight: 300,
                width: '300px',
              },
            }}
          >
            {notifications.length === 0 ? (
              <MenuItem disabled>No notifications</MenuItem>
            ) : (
              notifications.map((notif) => (
                <MenuItem key={notif._id}>
                  <div>
                    <Typography variant="subtitle2">{notif.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {notif.message}
                    </Typography>
                  </div>
                </MenuItem>
              ))
            )}
          </Menu>
        </Box>

        <Divider orientation="vertical" flexItem sx={{ height: 50, mt: 2 }} />
        <CircleIconBox icon={<Person4Icon sx={{ color: "white" }} />} />
        <span className="user-name">Ishan Lahiru</span>
      </div>
    </div>
  );
};
