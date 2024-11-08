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

export const Skeleton = () => {
  return (
    <div className="skeleton-loader">
      <div className="skeleton-shape "></div>
      <div className="skeleton-shape"></div>
      <div className="skeleton-shape"></div>
    </div>
  );
};
