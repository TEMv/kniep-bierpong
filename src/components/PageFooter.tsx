import img from "../assets/index";
import { Link } from "react-router-dom";
function PageFooter(props: any) {
  return (
    <>
      <div className=" h-24 absolute bottom-0 w-full flex justify-start pl-10 md:pl-0 md:justify-center items-center text-white">
        {props.insta ? (
          <a href="https://www.instagram.com/kniep_amrum/" target="_blank">
            <img
              className="h-10"
              src={img.Logos.instagram}
              alt="https://www.instagram.com/kniep_amrum/"
            />
          </a>
        ) : (
          <></>
        )}
      </div>
      <div className="absolute right-10 md:right-16 h-24 items-end justify-center bottom-0 flex flex-col text-xs md:text-base text-white">
        <Link to={"/impressum"}>Impressum</Link>
        <a href={"/datenschutz.html"}>Datenschutzerklärung</a>
      </div>
    </>
  );
}
export default PageFooter;
