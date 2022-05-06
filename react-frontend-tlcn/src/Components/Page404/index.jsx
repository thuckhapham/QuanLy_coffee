import Header2 from "../Header2/Header";

const Page404 = (props) => {
  console.log(props);
  return (
    <div>
      <Header2 />
      <div className="container">
        <h1>404 MOTHER FACKER!</h1>
        <h4>Page not found or You not have permission!</h4>
      </div>
    </div>
  );
};
export default Page404;
