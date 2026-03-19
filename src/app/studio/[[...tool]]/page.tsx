import { NextStudio } from "next-sanity/studio";
import { metadata, viewport } from "next-sanity/studio";
import config from "../../../../sanity.config";

export { metadata, viewport };

export default function StudioPage() {
  return <NextStudio config={config} />;
}
