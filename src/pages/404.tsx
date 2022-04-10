import {Button} from "antd";
import {Link} from "react-router-dom";

import ErrorMessage from "../components/ErrorMessage";
export default function NotFound() {
  return (
    <main>
      <ErrorMessage message="La página no ha sido encontrada" status="404">
        <Link to="/">
          <Button shape="round" size="large" type="primary">
            Ir a Inicio
          </Button>
        </Link>
      </ErrorMessage>
    </main>
  );
}
