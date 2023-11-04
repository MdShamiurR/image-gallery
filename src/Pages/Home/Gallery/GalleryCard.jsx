// import addImg from "../../../../images/addImg.png";


const GalleryCard = ({gallery,index}) => {
  const { img,gallery_id } = gallery;


  const isFirstService = index === 0;

  const dynamicStyle = isFirstService ? { gridRow: "1 / 3", gridColumn: "1 / 3" } : {};

  return (
    <div
      draggable
      className="card bg-base-100"
      style={{
        ...dynamicStyle,
        border: "1px solid gray",
        cursor: "move",
        borderRadius: "10px",
      }}
    >
      <div>
        <img src={img} alt="Shoes" />
      </div>
    </div>
  );
};

export default GalleryCard;
