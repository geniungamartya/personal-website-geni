import React from "react";
import { Gallery } from "@/app/components/gallery";

import { Photo } from "react-photo-album";
import sharp from "sharp";
import path from "path";

function assetLink(asset: string, width: number) {
  return `/_next/image?url=/images/${asset}&w=${width}&q=75`;
}

const breakpoints = [3840, 1920, 1080, 640, 384, 256, 128];

let photos2: any = ["public/images/1.jpeg"];

const getPhotoObjects = async (photos: any) => {
  const photoObjects = await Promise.all(
    photos.map(async (photo: any) => {
      const imagePath = path.resolve(photo); // Adjust path as needed
      const metadata = await sharp(imagePath).metadata();
      return {
        src: photo,
        width: metadata.width,
        height: metadata.height,
      };
    }),
  );
  return photoObjects;
};

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
