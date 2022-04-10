import {Layout, Input} from "antd";
import {useNavigate, useSearchParams} from "react-router-dom";

import {generateSearchUrl} from "../utils";
import logo from "../public/logo.png";
export default function Header({loading}: {loading?: boolean}) {
  const navigate = useNavigate();
  const handleSearch = (search: string) => {
    navigate(generateSearchUrl({search: search?.trim()}));
  };
  const [params] = useSearchParams();

  return (
    <>
      <Layout.Header className="header">
        <div className="header__inner">
          <a href="/">
            <img alt="home" className="logo" src={logo} />
          </a>

          <Input.Search
            enterButton
            className="search-bar"
            defaultValue={params.get("query") || ""}
            loading={loading || false}
            placeholder="Buscar producto"
            size="large"
            onSearch={handleSearch}
          />
        </div>
      </Layout.Header>
      <style>{`.search-bar {max-width:500px},.header{height:auto}`}</style>
    </>
  );
}
