import { useCallback, useRef } from "react";
import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

export interface MediaData {
  src: string;
  thumb: string;
}

export function GalleryCarousel({
  media,
  maxMedia = 1,
}: {
  media: MediaData[];
  maxMedia?: number;
}) {
  const lightGallery = useRef<any>(null);

  const onInit = useCallback((detail: any) => {
    if (detail) {
      lightGallery.current = detail.instance;
    }
  }, []);

  const onOpen = (index: number) => {
    lightGallery.current.openGallery(index);
  };

  return (
    <div>
      <LightGallery
        onInit={onInit}
        dynamic={true}
        hash={false}
        rotate={false}
        plugins={[lgZoom, lgThumbnail]}
        dynamicEl={media}
      >
        {media.slice(0, maxMedia).map((post, index) => {
          return (
            <div onClick={() => onOpen(index)} className="fj-gallery-item">
              <img src={post.src} />
            </div>
          );
        })}
      </LightGallery>
    </div>
  );
}
