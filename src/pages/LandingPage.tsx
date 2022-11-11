import PageHeader from "../components/PageHeader";
import PageFooter from "../components/PageFooter";
import ImageCard from "../components/ImageCard";
import { User } from "../types";

function LandingPage(props: { user?: User }) {
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div className="h-screen flex flex-col">
      <PageHeader onLoginPage={false} />
      <div className="font-white bg-slate-700 h-full w-full flex ">
        {arr.map((id) => {
          return <ImageCard image={"Amrum" + id} />;
        })}
      </div>
      <PageFooter />
    </div>
  );
}
export default LandingPage;
