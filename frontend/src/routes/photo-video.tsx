import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import fjGallery from "flickr-justified-gallery";
import { GalleryFeed, Media } from "../components/gallery-feed";

export const Route = createFileRoute("/photo-video")({
  component: RouteComponent,
});

function RouteComponent() {
  const [gallery, setGallery] = useState<Media[] | null>(null);

  useEffect(() => {
    fetch("/gallery.json")
      .then((res) => res.json())
      .then(setGallery)
      .catch((err) => console.error("Error loading blog post:", err));
  }, []);

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
  }, [gallery]);

  if (!gallery) return <div className="text-neutral-500">Still empty ;)</div>;

  return <GalleryFeed media={gallery} />;
}
