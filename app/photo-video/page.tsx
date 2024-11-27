import React from "react";
import { Gallery } from "@/app/components/gallery";
import { Photo } from "react-photo-album";

function assetLink(asset: string, width: number) {
  return `/_next/image?url=/images/${asset}&w=${width}&q=75`;
}

const breakpoints = [3840, 1920, 1080, 640, 384, 256, 128];

const photos = [
  { asset: "1.jpeg", width: 1200, height: 1600 },
  { asset: "2.jpeg", width: 1200, height: 1600 },
  { asset: "3.jpeg", width: 1200, height: 1600 },
  { asset: "4.jpeg", width: 1200, height: 1600 },
  { asset: "5.jpeg", width: 1200, height: 1600 },
  { asset: "6.jpeg", width: 1200, height: 1600 },
].map(
  ({ asset, width, height }) =>
    ({
      src: assetLink(asset, width),
      width,
      height,
      srcSet: breakpoints.map((breakpoint) => ({
        src: assetLink(asset, breakpoint),
        width: breakpoint,
        height: Math.round((height / width) * breakpoint),
      })),
    }) as Photo,
);

export default function Page() {
  // const  photos = getPhotos();
  return (
    <>
      <Gallery photos={photos} />
    </>
  );
}
