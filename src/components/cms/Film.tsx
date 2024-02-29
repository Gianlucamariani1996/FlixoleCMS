import { Box, Stack, Tab, Tabs, Typography } from "@mui/material";
import { useFilm } from "../../hooks/useFilm";
import Image from "next/image";
import { ReactNode, SyntheticEvent, useState } from "react";

export default function Film({ componentId }: { componentId: string }) {
  const {
    image,
    title,
    year,
    description,
    contentRating,
    directors,
    cast,
    genre,
    duration,
  } = useFilm(componentId);

  const [tab, setTab] = useState(0);
  const onTabChange = (_event: SyntheticEvent, next: number) => setTab(next);

  return (
    <div data-discovery-id={componentId}>
      <Stack py={6} px={12} direction={"row"} gap={2}>
        <Box
          sx={{
            position: "relative",
            width: 160,
            aspectRatio: "2/3",
            borderRadius: 1,
            overflow: "hidden",
          }}
        >
          <Image src={image} alt={title} fill />
        </Box>
        <Stack gap={1}>
          <Typography variant="h4">{title}</Typography>
          <Typography variant="body1">{year}</Typography>
          <Stack sx={{ opacity: 0.8 }}>
            <Typography variant="body2">{genre}</Typography>
            <Typography variant="body2">{duration}</Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack px={12}>
        <Tabs value={tab} onChange={onTabChange}>
          <Tab label="Sinopsis" />
        </Tabs>
      </Stack>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}></Box>
      <TabPanel value={tab} index={0}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <div
            dangerouslySetInnerHTML={{ __html: description }}
            style={{ maxWidth: 700 }}
          />
          <Stack width={300}>
            <Stack gap={2}>
              <Stack>
                <Typography variant="subtitle2">Directores</Typography>
                <Typography variant="caption" color={"primary.main"}>
                  {directors}
                </Typography>
              </Stack>
              <Stack>
                <Typography variant="subtitle2">Reparto</Typography>
                <Typography variant="caption" color={"primary.main"}>
                  <div dangerouslySetInnerHTML={{ __html: cast }} />
                </Typography>
              </Stack>
              <Stack>
                <Typography variant="subtitle2">Clasificación</Typography>
                <Typography variant="caption" color={"primary.main"}>
                  {contentRating}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </TabPanel>
    </div>
  );
}

function TabPanel(props: {
  children?: ReactNode;
  index: number;
  value: number;
}) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`cta-tabpanel-${index}`}
      aria-labelledby={`cta-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box px={12} py={2}>
          {children}
        </Box>
      )}
    </div>
  );
}
