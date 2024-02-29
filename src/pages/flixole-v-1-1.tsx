import type { PagePreviewData, PageProps } from "../types";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import type { ParsedUrlQuery } from "querystring";
import {
  DiscoveryComponents,
  DiscoveryContext,
  getDiscoveryCms,
} from "@discoverycms/connector";

import { Stack } from "@mui/material";
import PreviewIndicator from "../components/common/PreviewIndicator";
import Header from "../components/common/Header";

export const getStaticProps = (async (context) => {
  const { preview = false, previewData } = context;

  const data = previewData
    ? await getDiscoveryCms().getPage("flixole-v-1-1", {
        token: previewData.token,
      })
    : null;

  return {
    props: {
      preview,
      data,
    },
  };
}) satisfies GetStaticProps<PageProps, ParsedUrlQuery, PagePreviewData>;

export default function FlixOle({
  data,
  preview,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!data) return <>Missing flixole-v-1-1 data</>;
  return (
    <Stack pt={8}>
      <Header />
      {preview && <PreviewIndicator />}
      <DiscoveryContext.Provider value={data}>
        <DiscoveryComponents />
      </DiscoveryContext.Provider>
    </Stack>
  );
}
