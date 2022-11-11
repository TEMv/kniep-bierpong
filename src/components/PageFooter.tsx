import instagram from "../assets/instagram.png";

function PageFooter(props: any) {
  return (
    <div className="bg-gray-800 h-20 flex justify-center items-center text-white">
      <div className="flex justify-around w-1/2">
        <div className="flex flex-col">
          <a href="/impressum">Impressum</a>
          <a href="/kniep">Kniep</a>
        </div>
        <a href="https://www.instagram.com/kniep_amrum/">
          <img
            className="h-10"
            src={instagram}
            alt="https://www.instagram.com/kniep_amrum/"
          />
        </a>
      </div>
    </div>
  );
}
export default PageFooter;
