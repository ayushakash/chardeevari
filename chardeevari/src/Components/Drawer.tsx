import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Slide from "@mui/material/Slide";

type Anchor = "top" | "left" | "bottom" | "right";

interface ResponsiveDrawerProps {
  expanded: boolean;
  onClose: () => void;
}

const ResponsiveDrawer: React.FC<ResponsiveDrawerProps> = ({
  expanded,
  onClose,
}) => {
  const [state, setState] = React.useState({
    top: false,
    left: true, // Open the drawer by default
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
        marginTop: "64px",
      }}
      role="presentation"
    >
      <List>
        {["Home", "Wishlist", "Account", "Combo Offers"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["About us","Privacy Policy","Replacement Policy","Contact Us","terms and Condition","Shipping Policy Policy"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {/* Close button */}
      <Drawer
        anchor="left"
        open={expanded}
        onClose={onClose}
        transitionDuration={500} // Adjust the duration as desired
      >
        {/* Use Slide for a smooth transition */}
        <Slide direction="right" in={expanded} mountOnEnter unmountOnExit>
          {list("left")}
        </Slide>
      </Drawer>
    </div>
  );
};

export default ResponsiveDrawer;
