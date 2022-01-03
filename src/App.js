/* eslint-disable array-callback-return */
import "./App.css";
import { Formik } from "formik";
import { getRequest, postRequest } from "./services/apiService";
import { useEffect, useState } from "react";

function App() {
  const [passwordList, setPasswordList] = useState([]);
  useEffect(() => {
    const getPasswordList = async () => {
      const getList = await postRequest('/password/list',{});
      setPasswordList(getList.data);
    };
    getPasswordList();
  }, []);
  return (
    <div className="App">
      <div className="container">
        <header>
          <nav className="navbar navbar-light justify-content-between">
            <a className="navbar-brand color-white"> Password Store</a>
          </nav>
        </header>
        <Formik
          initialValues={{ sitename: "", url: "", username: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.sitename) {
              errors.sitename = "Name of the site is required";
            }
            if (!values.username) {
              errors.username = "Username is required";
            }
            if (!values.password) {
              errors.password = "Password is required";
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            const datareq = await postRequest("/password/store", values);
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col-sm-12">
                  <input
                    type="text"
                    name="sitename"
                    id="sitename"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.sitename}
                    placeholder="Site Name"
                  />
                  <p className="small error">
                    {errors.sitename && touched.sitename && errors.sitename}
                  </p>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-12">
                  <input
                    type="text"
                    name="url"
                    id="url"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.url}
                    placeholder="Url"
                  />
                  <p className="small error">
                    {errors.url && touched.url && errors.url}
                  </p>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-12">
                  <input
                    type="text"
                    name="username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                    placeholder="Username"
                  />
                  <p className="small error">
                    {errors.username && touched.username && errors.username}
                  </p>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-12">
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    placeholder="Password"
                  />
                  <p className="small error">
                    {errors.password && touched.password && errors.password}
                  </p>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-warning"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </form>
          )}
        </Formik>
      </div>
      <div className="list-table">
        <table className="table color-white">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Site Name</th>
              <th scope="col">URL</th>
              <th scope="col">Username</th>
              <th scope="col">Password</th>
            </tr>
          </thead>
          <tbody>
            {passwordList.map((pass, i) => {
              <tr>
                <th scope="row">{i+1}</th>
                <td>{pass.sitename}</td>
                <td>{pass.url}</td>
                <td>{pass.username}</td>
                <td>{pass.password}</td>
              </tr>;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
