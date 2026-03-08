import Header from "../../components/Header";
import "./PageNotFound.css";

function PageNotFound({ cart }) {
  return(
    <>
      <title>Page Not Found</title>

      <Header cart={cart} />

      <div className="PageNotFound-div">
        <p className="PageNotFound-text">Page Not Found</p>
      </div>
    </>
  );
}

export default PageNotFound;