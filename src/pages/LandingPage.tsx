import PageHeader from "../components/PageHeader";
import PageFooter from "../components/PageFooter";
import ImageCard from "../components/ImageCard";
import { User } from "../types";
import img from "../assets/index";

function LandingPage(props: { user?: User }) {
  return (
    <div className="h-screen flex flex-col">
      <PageHeader onLoginPage={false} />
      {/*<div className="font-white bg-slate-700 h-full w-full flex ">
        {
          Object.keys(img.LandingPage).map((id) => {
          return <ImageCard image={img.LandingPage[id]} />;
        }) <ImageCard image={img.LandingPage["Amrum1"]} />
        
      </div>*/}
      <video autoPlay loop muted className="fixed -z-10 w-full">
        <source src={img.Videos.backgroundvideo} type="video/mp4" />
      </video>
      <PageFooter />
    </div>
  );
}
export default LandingPage;
