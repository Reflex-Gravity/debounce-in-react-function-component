import React, { useState, useCallback, useEffect } from "react";
import ReactDOM from "react-dom";
import debounce from "lodash.debounce";
import "./styles.css";

const sendQuery = query => console.log(`Querying for ${query}`);

const SearchFixed = () => {
  const [userQuery, setUserQuery] = useState("");

  const updateQuery = () => sendQuery(userQuery);

  const delayedQuery = useCallback(debounce(updateQuery, 500), [userQuery]);

  const onChange = e => {
    setUserQuery(e.target.value);
  };

  useEffect(() => {
    delayedQuery();
    return delayedQuery.cancel;
  }, [userQuery, delayedQuery]);

  return (
    <div>
      <label style={{ paddingRight: 10 }}>Search:</label>
      <input onChange={onChange} value={userQuery} />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <h4>Type something here and check the console.</h4>
      <SearchFixed />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
