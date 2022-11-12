function Impressum(props: any) {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-2/5 h-full flex flex-col items-center shadow-xl shadow-gray-500">
        <div className="text-4xl font-medium mt-5">IMPRESSUM</div>
        <br />
        <div className="flex flex-col justify-center items-center">
          <div>Johannsen + Lorenzen + Lorenzen + van Bargen GbR</div>
          <br />
          <div>Papenkamp 51 24114 Kiel</div>
        </div>
        <br />
        <div className="flex justify-center flex-col items-center">
          <div className="text-2xl">Gesellschafter</div>
          <div>
            Mats Johannsen, Matti Lorenzen, Leve Lorenzen, Sebastian van Bargen
          </div>
        </div>
        <br />
        <div className="text-2xl">Kontakt</div>
        <div className="w-full flex flex-col justify-center items-center">
          <p className="w-1/3 flex justify-between">
            Telefon:
            <a className="pl-10" href="tel:+4915127147807">
              +49 1512 7147807
            </a>
          </p>

          <div className="w-1/3 flex justify-between">
            E-Mail:
            <a className="pl-10" href="mailto:kniepamrum@gmx.de">
              kniepamrum@gmx.de
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Impressum;
