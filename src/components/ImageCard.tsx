function ImageCard(props: { image: string }) {
  return (
    <div className=" h-96 bg-red-800 border-slate-600 w-72 m-5">
      <img src={props.image} />
    </div>
  );
}
export default ImageCard;
