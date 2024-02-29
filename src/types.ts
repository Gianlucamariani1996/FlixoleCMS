import type {
  DiscoveryContext,
  DiscoveryRequestOptions,
} from "@discoverycms/connector/dist/types/types";

export type PageProps = {
  preview: boolean;
  data:
    | null
    | (DiscoveryContext & {
        seo: SEO;
      });
};

export type PagePreviewData = {
  token: string;
};

export type PageStaticPropsContext = {
  query: DiscoveryRequestOptions;
  preview: boolean;
  previewData: {
    token: string;
  };
};

export type SEO = {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  ogType: string;
  ogImage: string;
};
