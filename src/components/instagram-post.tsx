import { useEffect } from "react";

export function InstagramPost(link: string) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  //   const link =
  //     "https://www.instagram.com/p/DFpzDUvtd9W/?utm_source=ig_embed&amp;utm_campaign=loading";

  return (
    <>
      <blockquote className="instagram-media" data-instgrm-permalink={link} />
    </>
  );
}
