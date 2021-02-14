import Link from "next/link";

export default function ResetPassword() {
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-5 col-xl-4 my-5">
            <h1 className="display-4 text-center mb-3">Reset Password</h1>
            <form>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="name@address.com"
                />
              </div>

              <button className="btn btn-lg btn-block btn-secondary mb-3">
                Reset Password
              </button>
              <div className="text-center">
                <small className="text-muted text-center">
                  Don't have an account yet?{" "}
                  <Link href={"/register"}>Sign up</Link>.
                </small>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
