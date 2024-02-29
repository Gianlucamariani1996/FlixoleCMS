import { Divider } from "@mui/material";

export default function CenteredHeadline({
  componentId,
}: {
  componentId: string;
}) {
  return (
    <div data-discovery-id={componentId}>
      <Divider />
    </div>
  );
}
