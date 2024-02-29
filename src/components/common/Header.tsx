import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Header() {
  return (
    <AppBar position="fixed" elevation={0}>
      <Toolbar>
        <Typography variant="h3" component="span" color={"primary.main"}>
          Flix
        </Typography>
        <Typography variant="h3" component="span">
          Olé
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
