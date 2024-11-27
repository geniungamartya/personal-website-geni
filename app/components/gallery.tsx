"use client";

import * as React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

import {
  isImageFitCover,
  isImageSlide,
  useLightboxProps,
  useLightboxState,
} from "yet-another-react-lightbox";
import {
  RenderImageContext,
  RenderImageProps,
  RowsPhotoAlbum,
} from "react-photo-album";
import "react-photo-album/rows.css";

const Lightbox = dynamic(() => import("@/app/components/lightbox"));

function NextImageForPhotoAlbum(
  { alt = "", title, sizes }: RenderImageProps,
  { photo, width, height }: RenderImageContext,
) {
  return (
    <div
      style={{
        width: "100%",
        position: "relative",
        aspectRatio: `${width} / ${height}`,
      }}
    >
      <Image
        fill
        src={photo}
        alt={alt}
        title={title}
        sizes={sizes}
        placeholder={"blurDataURL" in photo ? "blur" : undefined}
      />
    </div>
  );
}

function isNextJsImage(slide: any): any {
  return (
    isImageSlide(slide) &&
    typeof slide.width === "number" &&
    typeof slide.height === "number"
  );
}

function NextImageForLightbox({ slide, offset, rect }: any) {
  const {
    on: { click },
    carousel: { imageFit },
  } = useLightboxProps();

  const { currentIndex } = useLightboxState();

  const cover = isImageSlide(slide) && isImageFitCover(slide, imageFit);

  if (!isNextJsImage(slide)) return undefined;

  const width = !cover
    ? Math.round(
        Math.min(rect.width, (rect.height / slide.height) * slide.width),
      )
    : rect.width;

  const height = !cover
    ? Math.round(
        Math.min(rect.height, (rect.width / slide.width) * slide.height),
      )
    : rect.height;

  return (
    <div style={{ position: "relative", width, height }}>
      <Image
        fill
        alt=""
        src={slide}
        loading="eager"
        draggable={false}
        placeholder={slide.blurDataURL ? "blur" : undefined}
        style={{
          objectFit: cover ? "cover" : "contain",
          cursor: click ? "pointer" : undefined,
        }}
        sizes={`${Math.ceil((width / window.innerWidth) * 100)}vw`}
        onClick={
          offset === 0 ? () => click?.({ index: currentIndex }) : undefined
        }
      />
    </div>
  );
}

export function Gallery({ photos }: any): JSX.Element {
  const [index, setIndex] = React.useState(-1);
  return (
    <>
      <RowsPhotoAlbum
        photos={photos}
        render={{ image: NextImageForPhotoAlbum }}
        defaultContainerWidth={1200}
        sizes={{
          size: "1168px",
          sizes: [
            { viewport: "(max-width: 1200px)", size: "calc(100vw - 32px)" },
          ],
        }}
        onClick={({ index: current }) => setIndex(current)}
      />

      <Lightbox
        index={index}
        slides={photos}
        open={index >= 0}
        close={() => setIndex(-1)}
        render={{ slide: NextImageForLightbox }}
      />
    </>
  );
}
