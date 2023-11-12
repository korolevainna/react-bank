import "./index.scss";

export default function Component({ title, desctiption, small = false }) {
  return (
    <>
      {small ? (
        <div className="title--small">
          <h1 className="title__heading--small">{title}</h1>
          <p className="title__description">{desctiption}</p>
        </div>
      ) : (
        <div className="title">
          <h1 className="title__heading">{title}</h1>
          <p className="title__description">{desctiption}</p>
        </div>
      )}
    </>
  );
}