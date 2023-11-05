import update from "immutability-helper";
import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import addImg from "../../../../images/addImg.png";
import "./Gallery.css";
import GalleryCard from "./GalleryCard";

const Gallery = () => {
  const [state, setState] = useState({
    count: 0,
    selected: [],
    photos: [], // Initialize photos as an empty array
  });

 useEffect(() => {
   // Fetch the gallery data from gallery.json
   fetch("gallery.json")
     .then((res) => res.json())
     .then((data) =>
       setState({
         ...state,
         photos: data,
       })
     );
 }, []);


  const { photos, selected ,count} = state;


const handleIPhotoUploader = (event) => {
  const selectedFile = event.target.files[0];

  if (selectedFile) {
    const newImage = {
      gallery_id: photos.length + 1,
      img: URL.createObjectURL(selectedFile),
    };

    setState((prevState) => {
      return {
        ...prevState,
        photos: [...prevState.photos, newImage],
      };
    });
  }
};

  const handelDelete = () => {
    const selectedIds = new Set(selected); // create a set of selected gallery IDs

    const remainingPhotos = photos.filter(
      (photo) => !selectedIds.has(photo.gallery_id)
    );

    setState({
      ...state,
      count: 0, // reset count to 0
      selected: [], // clear the selected items
      photos: remainingPhotos, // update the remaining photos
    });
  };

  const draggingGrid = (index, hoverIndex) => {
    setState(
      update(state, {
        photos: {
          $splice: [
            [index, 1],
            [hoverIndex, 0, photos[index]],
          ],
        },
      })
    );
  };

  return (
    <div className="mt-24 max-w-5xl photo-gallery p-5 bg-zinc-100 shadow shadow-black m-auto ">
      <div className="flex justify-between items-center border-b-2">
        {count > 0 ? (
          <>
            <h3 className="font-bold p-4 ">
              <input type="checkbox" defaultChecked={true} /> {count} File
              Selected
            </h3>
            <p className="font-bold p-4 text-red-600 " onClick={handelDelete}>
              Delete files
            </p>
          </>
        ) : (
          <>
            <h3 className="font-bold p-4 ">Gallery</h3>
          </>
        )}
      </div>

      <DndProvider backend={HTML5Backend}>
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5 grid-rows-3  md:grid-rows-2 gap-4 p-5 photoGrid">
          {photos.map((gallery, index) => (
            <GalleryCard
              key={index}
              gallery={gallery}
              index={index}
              state={state}
              // handelSet={setState}
              setState={setState}
              draggingGrid={draggingGrid}
            />
          ))}
          {/* for uploading new images */}
          <div
            style={{
              border: "2px dotted gray",
              borderRadius: "5px",
              position: "relative",
            }}
          >
            <img src={addImg} alt="addImage" />
            <input
              className="w-full h-full photoUploader"
              style={{
                opacity: 0, // Hide the file input
                cursor: "pointer",
              }}
              type="file"
              accept="image/*" // Accept all image types
              onChange={handleIPhotoUploader}
            />
          </div>
        </div>
      </DndProvider>
    </div>
  );
};

export default Gallery;
