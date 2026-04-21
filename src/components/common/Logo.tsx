import { Box } from "@mui/material";
import logoImg from "../../../public/logo-name.png";

const Logo = () => {
  return (

      <img
        src={logoImg}
        alt="TestGrid Logo"
        style={{ width: "100%", height: "auto"}}
      />
  );
};

export default Logo;
