import {Typography, Layout, Button} from "antd";
import {Link} from "react-router-dom";

import MarketsList from "../components/MarketsList";
import Header from "../components/Header";

import illustration from "./../public/illustration.jpg";

const {Content} = Layout;
const {Title} = Typography;

function App() {
  return (
    <Layout>
      <Header loading={false} />
      <section className="page">
        <Content className="content">
          <section className="illustration__section">
            <div className=" illustration__section__text">
              <Title level={1}> Te ayudamos a mantener la economía del hogar </Title>{" "}
              <Title level={2}>
                Encontrá y trackea los mejores precios disponibles en tus supermercados online
                favoritos desde un solo lugar.
              </Title>
              <Link to="/search">
                <Button className="action-bottom" shape="round" size="large" type="primary">
                  Comenzar
                </Button>
              </Link>
            </div>

            <div className="illustration__wrapper">
              <img alt="" className="illustration" src={illustration} />
            </div>
          </section>
          <MarketsList />
        </Content>
      </section>

      <style>{`
      .page{
  
            min-height: 90vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
      }
          .content{
                width: 100%;

    height: auto;
        max-width: 1250px;
        margin: 0 auto;
        padding:0 2rem 2rem;
  
    display: flex;
    flex-direction: column;
    justify-content: center;
      }
     .illustration__section{
         min-height: 440px;
           margin:1rem 0 1.5rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
       padding: 0;
}

      .illustration__section__text{

    float: left;

   
      }
   .illustration__section h1{
         font-weight: 100;
    color: var(--secondary);

   }     
     .illustration__section  h2{
         font-weight: 100;
    margin: 1em 0;
    font-size: 1.5rem
   }

.action-bottom{
      margin-top: 2rem;
          font-weight: 600;

}
.illustration__wrapper{
  width: 100%;
    flex: 1;

    max-width: 590px;
}
    .illustration{
       height: max-content;
         background-image:url(${illustration});
 animation: slide-left 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    max-width: 590px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
      }

  

        

 
            @media(min-width:760px){
 
                   .illustration__section__text{
max-width: 560px;
    float: left;

          }
      }
            @media(min-width:1247px){
 
                   .illustration__section__text{
 padding:4rem 0 ;
          }
      }
      `}</style>
    </Layout>
  );
}

export default App;
