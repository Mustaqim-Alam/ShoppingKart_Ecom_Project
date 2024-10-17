import { BounceLoader } from "react-spinners";

function Loader() {
  return (
    <section className="loader">
      <div className="sweet-loading">
        <BounceLoader color="blue" />
      </div>
    </section>
  );
}
export default Loader;
