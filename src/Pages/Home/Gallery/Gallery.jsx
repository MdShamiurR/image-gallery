

import { useEffect, useState } from "react";
import GalleryCard from "./GalleryCard";

const Gallery = () => {
  const [Galleries, setGalleries] = useState([]);
  useEffect(() => {
    fetch("gallery.json")
      .then((res) => res.json())
      .then((data) => setGalleries(data));
  }, []);

  return (
    <div className="mt-14">
      <div className="grid grid-cols-5 grid-rows-3 gap-4">
        {Galleries.map((gallery, index) => (
          <GalleryCard
            key={gallery.gallery_id}
            gallery={gallery}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;