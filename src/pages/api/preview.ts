import { getDiscoveryCms, setupDiscoveryCms } from "@discoverycms/connector";
import { NextApiRequest, NextApiResponse } from "next";

setupDiscoveryCms({
  apiRoot: process.env.NEXT_PUBLIC_DISCOVERY_API_ROOT || "",
  apiToken: process.env.NEXT_PUBLIC_DISCOVERY_API_TOKEN || "",
  propertyTitle: process.env.NEXT_PUBLIC_PROPERTY_TITLE || "",
});

const narrowToString = (data?: string[] | string) =>
  Array.isArray(data) ? data[0] : data;

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const secret = narrowToString(request.query.secret);
  const slug = narrowToString(request.query.slug);
  const pathCandidate = narrowToString(request.query.path) ?? slug ?? "/";

  const path = pathCandidate.startsWith("/")
    ? pathCandidate
    : `/${pathCandidate}`;

  if (process.env.DISCOVERY_PREVIEW_TOKEN !== secret) {
    return response.status(401).json({ message: "Unauthorized" });
  }

  if (!slug || !secret) {
    return response.status(400).json({ message: "Bad request" });
  }

  const isValidSlug = async () => {
    const data = await Promise.any([
      getDiscoveryCms().getPage(slug, { token: secret }),
      getDiscoveryCms().getContent(slug, { token: secret }),
    ]);
    return !!data;
  };

  if (!(await isValidSlug())) {
    return response.status(400).json({ message: "Invalid slug" });
  }

  response.setPreviewData({ token: process.env.DISCOVERY_PREVIEW_TOKEN });

  const cookiesCandidate = response.getHeader("Set-Cookie");
  const cookies = (
    Array.isArray(cookiesCandidate) ? cookiesCandidate : [cookiesCandidate]
  )
    .filter(Boolean)
    .map((entry) => `${entry}`);

  response.setHeader(
    "Set-Cookie",
    cookies.map((cookie) =>
      cookie.replace("SameSite=Lax", "SameSite=None;Secure")
    )
  );

  response.writeHead(307, { Location: path });
  response.end();
}
