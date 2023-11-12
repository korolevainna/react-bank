import "./index.scss";

export default function Heading({ children, title }) {
  return (
    <div className="heading">
      <h1 className="heading__title">{title}</h1>

      <p className="heading__description">{children}</p>
    </div>
  );
}