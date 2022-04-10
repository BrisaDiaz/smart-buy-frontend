import veaLogo from "../public/vea-logo.png";
import carrefourLogo from "../public/carrefour-logo.png";
import hiperlibertadLogo from "../public/hiperlibertad-logo.png";
import discoLogo from "../public/disco-logo.png";
import cotoLogo from "../public/coto-logo.png";
import cordiezLogo from "../public/cordiez-logo.png";
import jumboLogo from "../public/jumbo-logo.png";
import supermamiLogo from "../public/super-mami-logo.png";
import diaLogo from "../public/dia-logo.png";
import maxiconsumoLogo from "../public/maxiconsumo-logo.png";
import laAnonimaLogo from "../public/la-anonima-logo.png";

export default function MarketsList() {
  return (
    <>
      <section>
        <div className="markets__list">
          <img alt="vea" className="market__logo" src={veaLogo} />
          {/* <img alt="carrefour" className="market__logo" src={carrefourLogo} /> */}
          <img alt="la anonima online" className="market__logo" src={laAnonimaLogo} />
          <img alt="coto" className="market__logo" src={cotoLogo} />
          <img alt="cordiez" className="market__logo" src={cordiezLogo} />
          <img alt="dia" className="market__logo" src={diaLogo} />

          <img alt="maxiconsumo" className="market__logo" src={maxiconsumoLogo} />
          <img alt="disco" className="market__logo" src={discoLogo} />
          <img alt="super mami" className="market__logo" src={supermamiLogo} />
          <img alt="hiperlibertad" className="market__logo" src={hiperlibertadLogo} />

          <img alt="jumbo" className="market__logo" src={jumboLogo} />
        </div>
      </section>
      <style>{`      
      .markets__list{
        margin-top:auto;
        pointer-events: none;
        display: flex;
         
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: space-around;

      }
      .market__logo{
        height:40px;
        width:auto;
      }`}</style>
    </>
  );
}
