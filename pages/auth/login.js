import React, { useState, useEffect } from "react";
import Link from "next/link";
import { withRouter } from "next/router";
import { signIn, getSession, providers } from "next-auth/client";
import { Spinner } from "reactstrap";
import { Formik, Form, Field } from "formik";

function Login({ router, providers }) {
  console.log("PRI", providers);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values) => {
    setIsLoading(true);

    const response = await signIn("credentials", {
      ...values,
      redirect: false
    });

    setIsLoading(false);
    console.log("Sign In", response);

    if (response.status == 200) {
      router.push("/wallet");
    } else {
      alert("Invalid username and password");
    }

    //router.push("/wallet");
  };

  const handleGitHubSingIn = async () => {
    const response = await signIn("GitHub");
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-5 col-xl-4 my-5">
            <h1 className="display-4 text-center mb-3">Sign in</h1>

            <p className="text-muted text-center mb-5">
              Free access to our dashboard.
            </p>
            <Formik
              initialValues={{
                username: "",
                password: ""
              }}
              onSubmit={handleSubmit}
            >
              <Form>
                <div className="form-group">
                  <label>Email Address</label>

                  <Field
                    type="text"
                    name={"username"}
                    className="form-control"
                    placeholder="name@address.com"
                  />
                </div>

                <div className="form-group">
                  <div className="row">
                    <div className="col">
                      <label>Password</label>
                    </div>
                    <div className="col-auto">
                      <Link href="/account/reset-password">
                        <a className={"form-text small text-muted"}>
                          Forgot password?
                        </a>
                      </Link>
                    </div>
                  </div>

                  <div className="input-group input-group-merge">
                    <Field
                      type="password"
                      name={"password"}
                      className="form-control form-control-appended"
                      placeholder="Enter your password"
                    />

                    <div className="input-group-append">
                      <span className="input-group-text">
                        <i className="fa fa-eye"></i>
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type={"submit"}
                  className="btn btn-lg btn-block btn-primary mb-3"
                >
                  {isLoading ? <Spinner color="primary" /> : "Sign In"}
                </button>
                <div className="text-center">
                  <small className="text-muted text-center">
                    Don't have an account yet?{" "}
                    <Link href={"/auth/register"}>Sign up</Link>.
                  </small>
                </div>
              </Form>
            </Formik>
            {Object.values(providers).map((provider) => {
              if (provider.name == "Credentials") {
                return null;
              }

              return (
                <div key={provider.name}>
                  <button
                    className="btn btn-lg btn-block btn-primary mb-3"
                    onClick={() => signIn(provider.id)}
                  >
                    Sign in with {provider.name}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default withRouter(Login);

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: "/wallet"
      }
    };
  }

  return {
    props: {
      providers: await providers(context)
    }
  };
}
