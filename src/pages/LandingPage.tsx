import LandingPageContent from "../components/LandingPageContent";
import PageFooter from "../components/PageFooter";
import ImageCard from "../components/ImageCard";
import { User } from "../types";
import img from "../assets/index";

function LandingPage(props: { user?: User }) {
  return (
    <div className="h-screen flex flex-col overflow-x-hidden">
      <LandingPageContent />
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed -z-10 min-w-full min-h-full object-cover"
      >
        <source src={img.Videos.backgroundvideo} type="video/mp4" />
      </video>
      <PageFooter />
    </div>
  );
}
export default LandingPage;
