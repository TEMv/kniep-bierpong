import img from "../assets/index";
import type { ImageIndex } from "../types";
function ImageCard(props: { image: string }) {
  let source = props.image;
  return (
    <div>
      <img src={img[source as keyof ImageIndex]} />
    </div>
  );
}
export default ImageCard;
