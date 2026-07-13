export const ProductCard = ({ image, title, price }) => {
  return (
    <div className="card-wrapper border p-5">
      <div>
        <img className="w-full object-cover" src={image} alt={title} />
      </div>
      <div className="details">
        <p className="title font-medium">{title}</p>
        <div className="price font-semibold">{price} /-</div>
      </div>
    </div>
  );
};
