import Header from "../components/Header";
import "./PageNotFound.css";

function PageNotFound() {
  return(
    <>
      <title>Page Not Found</title>

      <Header />

      <div className="PageNotFound-div">
        <p className="PageNotFound-text">Page Not Found</p>
      </div>
    </>
  );
}

export default PageNotFound;