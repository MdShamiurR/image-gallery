import { useEffect, useState } from "react";
import addImg from "../../../../images/addImg.png";
import "./Gallery.css";
import GalleryCard from "./GalleryCard";

const Gallery = () => {
  const [Galleries, setGalleries] = useState([]);
  const [state, setState] = useState({
    count: 0,
    selected: [],
    photos: [], // Initialize photos as an empty array
    // addImages: [],
  });

 useEffect(() => {
   // Fetch the gallery data from gallery.json
   fetch("gallery.json")
     .then((res) => res.json())
     .then((data) => {
       setGalleries(data);
       // Now that Galleries is set, update photos
       setState({
         ...state,
         photos: data,
       });
     });
 }, []);


  const { photos, selected ,count} = state;
  console.log("all I", photos);

  const handleIPhotoUploader = (up) => {
    const newImage = {
      gallery_id: photos.length + 1,
      img: URL.createObjectURL(up.target.files[0]),
    };
    setState({
      ...state,
      photos: [...photos, newImage],
    });
  };

  return (
    <div className="mt-14">
      
      <div className="grid grid-cols-5 grid-rows-3 gap-4">
        {photos.map((gallery, index) => (
          <GalleryCard
            key={gallery.gallery_id}
            gallery={gallery}
            index={index}
          />
        ))}
        {/* Add an input field for uploading new images */}
        <div
          style={{
            border: "2px dotted gray",
            borderRadius: "5px",
            position: "relative",
          }}
        >
          <img src={addImg} alt="addImage" />
          <input
            style={{
              position: "absolute",
              left: "0",
              top: "0",
              width: "100%",
              height: "100%",
              opacity: 0, // Hide the file input
            }}
            type="file"
            accept="image/*" // Accept all image types
            onChange={handleIPhotoUploader}
          />
        </div>
      </div>
    </div>
  );
};

export default Gallery;
