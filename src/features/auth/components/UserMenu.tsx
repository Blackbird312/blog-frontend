"use client";

import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import React from "react";
import { signOut, useSession } from "next-auth/react";

export default function UserMenu() {
  const { data } = useSession();
  const user = data?.user;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  if (!user) return null;

  const initials =
    (user.name || user.email || "U")
      .split(" ")
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase())
      .join("") || "U";

  return (
    <>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} size="small">
        <Avatar sx={{ width: 34, height: 34 }}>{initials}</Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem disabled>
          <Typography variant="body2">
            {user.name || user.email}
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
