import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./styles.css";

const Input = ({ name, checkError, validate }) => {
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    if (touched && checkError(value)) {
      setError("Please enter a value!");
    } else {
      setError("");
    }
  }, [touched, value]);

  useEffect(() => {
    if (validate) {
      if (checkError(value)) {
        setError("Please enter a value!");
      } else {
        setError("");
      }
    }
  }, [validate, checkError, value]);
  return (
    <div>
      <label>{name}</label>
      <input
        id={name}
        name={name}
        type="text"
        onFocus={() => setTouched(true)}
        onChange={e => setValue(e.target.value)}
        value={value}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

function App() {
  const [validate, setValidate] = useState(false);
  const [formMessage, setFormMessage] = useState("");
  const checkError = value => value.length < 1;
  const onHandleSubmit = e => {
    console.log("submit!");
    e.preventDefault();
    const formTarget = e.target;
    const value1 = formTarget["myText1"].value;
    const value2 = formTarget["myText2"].value;
    const value3 = formTarget["myText3"].value;
    const values = [value1, value2, value3];
    setValidate(true);
    const errors = values.map(value => checkError(value));
    console.log("Errors: ", errors);
    if (errors.includes(true)) {
      setFormMessage("Errors! Please check your values.");
    } else {
      setFormMessage("Form Submitted Successfully!");
    }
  };

  return (
    <div className="App">
      <h1>Form</h1>
      <p>Form with individual Input State</p>
      <p>Parent will access the value only on submit</p>
      <form onSubmit={onHandleSubmit}>
        <Input name="myText1" checkError={checkError} validate={validate} />
        <Input name="myText2" checkError={checkError} validate={validate} />
        <Input name="myText3" checkError={checkError} validate={validate} />
        <button type="submit">Submit</button>
      </form>
      {formMessage && <p>{formMessage}</p>}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
