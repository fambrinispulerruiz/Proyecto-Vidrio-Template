import Link from "next/link";
import { styled } from "@mui/material";
import Image from "next/image";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import logoImage from "./_c4e1344c-c7b9-447f-b00a-a68d4073685a.jpeg";
import DriveEtaIcon from "@mui/icons-material/DriveEta";

const LinkStyled = styled(Link)(() => ({
  height: "40px",
  width: "240px",
  overflow: "hidden",
  display: "block",
}));

const LogoContainer = styled(Grid)({
  display: "flex",
  alignItems: "center",
  whiteSpace: "nowrap",
});

const Logo = () => {
  return (
    <LinkStyled href="/">
      <LogoContainer container spacing={2}>
        <Grid item>
        <DriveEtaIcon fontSize="large" style={{ marginRight: "10px" }} />
        </Grid>
        <Grid item>
          <Typography variant="h6" noWrap>El Emporio del Vidrio</Typography>
        </Grid>
      </LogoContainer>
    </LinkStyled>
  );
};

export default Logo;
