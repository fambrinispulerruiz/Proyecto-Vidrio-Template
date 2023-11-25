import Link from "next/link";
import { styled } from "@mui/material";
import Image from "next/image";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";


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
          <Image
            src="/images/logos/_c4e1344c-c7b9-447f-b00a-a68d4073685a.jpeg"
            alt="logo"
            style={{ marginTop: '-5px' }}
            height={50}
            width={50}
            priority
          />
        </Grid>
        <Grid item>
          <Typography variant="h6" noWrap>El Emporio del Vidrio</Typography>
        </Grid>
      </LogoContainer>
    </LinkStyled>
  );
};

export default Logo;
