import { Button, Typography } from "@mui/material";
import Link from "next/link";

export default function PreviewIndicator() {
  return (
    <Typography
      p={1}
      sx={{
        position: "fixed",
        top: 0,
        right: 0,
        zIndex: 1200,
        display: "flex",
        gap: "8px",
      }}
    >
      Preview mode
      <Link href="/api/exit-preview" prefetch={false}>
        Exit
      </Link>
    </Typography>
  );
}
