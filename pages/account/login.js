import Link from "next/link";
import { withRouter } from "next/router";

function Login({ router }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("/wallet");
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

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email Address</label>

                <input
                  type="email"
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
                  <input
                    type="password"
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

              <button className="btn btn-lg btn-block btn-primary mb-3">
                Sign in
              </button>
              <div className="text-center">
                <small className="text-muted text-center">
                  Don't have an account yet?{" "}
                  <Link href={"/account/register"}>Sign up</Link>.
                </small>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default withRouter(Login);
