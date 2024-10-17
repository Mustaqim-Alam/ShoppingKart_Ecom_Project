import { BounceLoader } from "react-spinners";

function LoaderComp() {
  return (
    <section className="loader">
      <div className="sweet-loading">
        <BounceLoader color="blue" />
      </div>
    </section>
  );
}
export default LoaderComp;
