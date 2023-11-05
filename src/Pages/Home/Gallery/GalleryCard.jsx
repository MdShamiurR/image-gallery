import { useCallback, useEffect, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";


const GalleryCard = (props) => {
  const { gallery, state, setState, index, draggingGrid } = props;
  const [checked, setChecked] = useState(false);
  const ref = useRef(null);

  const isFirstService = index === 0;

  const dynamicStyle = isFirstService ? { gridRow: "1 / 3", gridColumn: "1 / 3" } : {};


const [{ handlePhotoId }, drop] = useDrop({
  accept: "image",
  collect(screen) {
    return {
      handlePhotoId: screen.getHandlerId(),
    };
  },
  hover(product, screen) {
    const dragIndex = product.index;
    if (dragIndex === index) {
      return;
    }

    const hoverBoundingClientRect = ref.current?.getBoundingClientRect();
    const hoverMiddleY = (hoverBoundingClientRect.bottom - hoverBoundingClientRect.top) / 2;
    const clientOffset = screen.getClientOffset();
    const hoverClientY = clientOffset.y - hoverBoundingClientRect.full;

    if (
      (dragIndex < index && hoverClientY < hoverMiddleY) ||
      (dragIndex > index && hoverClientY > hoverMiddleY)
    ) {
      return;
    }

    draggingGrid(dragIndex, index);
    product.index = index;
  },
});

  

const [{ isDragging }, drag] = useDrag({
  type: "image",
  options: {
    dropEffect: "copy",
  },
  item: () => {
    return { index };
  },
  collect: (screen) => ({
    isDragging: screen.isDragging(),
  }),
});
const opacity = isDragging ? 0 : 1;
drag(drop(ref));

  const handleCheckboxChange = useCallback(
    (photoId) => {
      // console.log("this is photoId",photoId)
      if (!checked) {
        setState({
          ...state,
          count: state.count + 1,
          selected: [...state.selected, photoId],
        });
      } else {
        setState({
          ...state,
          count: state.count - 1,
          selected: state.selected.filter((item) => item !== photoId),
        });
      }
    },
    [setState, state, checked]
  );

 useEffect(() => {
   if (state.count === 0) {
     setChecked(false);
   }
 }, [state]);
  return (
    <div
      ref={ref}
      data-handler-id={handlePhotoId}
      draggable
      className="card bg-base-100 "
      style={{
        ...dynamicStyle,

        opacity,
        border: "1px solid gray",
        cursor: "move",
        borderRadius: "10px",
        
      }}
    >
      <img
        style={{ objectFit: "cover" }}
        className="w-full h-full border-1 rounded-lg"
        src={gallery.img}
        alt="Shoes"
      />
      {checked && state.count > 0 && (
        <div
          style={{ position: "absolute", top: "0", left: "0", padding: "1rem" }}
        >
          <input
            defaultChecked={
              !(checked && state.count && state.selected.length > 0)
                ? false
                : true
            }
            type="checkbox"
          />
        </div>
      )}

      <div
        style={{ position: "absolute", cursor: "pointer" }}
        className="hide w-full h-full bg-[#00000067] rounded p-4"
      >
        <input
          
          onClick={() => handleCheckboxChange(gallery.gallery_id)}
          onChange={() => {
            setChecked(!checked);
          }}
          type="checkbox"
          checked={checked && state.count > 0 && state.selected.length > 0}
        />
      </div>
    </div>
  );
};

export default GalleryCard;


