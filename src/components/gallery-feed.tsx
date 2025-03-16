import { useEffect } from "react";
import fjGallery from "flickr-justified-gallery";
import { GalleryCarousel, MediaData } from "./gallery-carousel";

export interface Media {
  data: MediaData[];
}

export function GalleryFeed({ media }: { media: Media[] }) {
  useEffect(() => {
    fjGallery(document.querySelectorAll(".fj-gallery"), {
      itemSelector: ".fj-gallery-item",
      rowHeight: 180,
      maxRowsCount: 5,
      lastRow: "start",
      gutter: 2,
      rowHeightTolerance: 0.1,
      calculateItemsHeight: false,
    });
  }, []);

  return (
    <div className="fj-gallery">
      {media.map((post) => {
        return <GalleryCarousel media={post.data} />;
      })}
    </div>
  );
}
