import "./index.scss";

export default function Page({ children, className }) {
  return <div className={`page ${className}`}>{children}</div>;
}