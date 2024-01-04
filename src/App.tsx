import { useEffect } from "react";
import "./App.css";
import { useQuery, gql } from "@apollo/client";

const GET_DATA = gql`{}`;

function App() {
  const { loading, error, data } = useQuery(GET_DATA);

  useEffect(() => {
    console.log(loading, error, data);
  });
  return <div>{data ? data : null}</div>;
}

export default App;
