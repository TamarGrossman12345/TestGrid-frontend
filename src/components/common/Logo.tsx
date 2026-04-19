import { Box } from "@mui/material";
import logoImg from "../../../public/logo-name.png";

const Logo = () => {
  return (
    <Box
      sx={{
        position: "fixed", 
        top: 16, 
        left: 16, 
        zIndex: 1200,
        display: "flex",
      }}
    >
      <img
        src={logoImg}
        alt="TestGrid Logo"
        style={{ width: "100%", height: "auto", maxWidth: "160px" }}
      />
    </Box>
  );
};

export default Logo;
