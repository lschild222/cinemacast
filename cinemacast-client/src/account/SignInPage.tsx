import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { userAPI } from "../users/userAPI";

import { User } from "../users/User";
import toast from "react-hot-toast";
import { useUserContext } from "../users/UserContext";

interface IAccount {
  username: string;
  password: string;
}

let emptyAccount = {
  username: "",
  password: "",
};

function persistUser(user: User) {
  localStorage.setItem("user", JSON.stringify(user));
}

function SignInPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAccount>({
    defaultValues: async () => {
      return emptyAccount;
    },
  });
  const { setUser } = useUserContext();

  const signin: SubmitHandler<IAccount> = async (account) => {
    try {
      const user = await userAPI.findByAccount(
        account.username,
        account.password
      );
      persistUser(user);
      setUser(user);

      navigate("/movies");
    } catch (error: any) {
      toast.error("Unsuccessful sign in. Please try again.");
    }
  };

  return (
    <main className="signin d-flex flex-column gap-4 justify-content-center align-items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="73"
        height="49"
        fill="none"
      >
        <path
          fill="#68DBFF"
          d="M46.868 24c0 12.426-10.074 22.5-22.5 22.5-12.427 0-22.5-10.074-22.5-22.5S11.94 1.5 24.368 1.5c12.426 0 22.5 10.074 22.5 22.5Z"
        />
        <path
          fill="#FF7917"
          d="M71.132 24c0 12.426-9.975 22.5-22.28 22.5-12.304 0-22.278-10.074-22.278-22.5S36.547 1.5 48.852 1.5c12.304 0 22.28 10.074 22.28 22.5Z"
        />
        <path
          fill="#5D2C02"
          d="M36.67 42.842C42.81 38.824 46.868 31.886 46.868 24c0-7.886-4.057-14.824-10.198-18.841A22.537 22.537 0 0 0 26.573 24 22.537 22.537 0 0 0 36.67 42.842Z"
        />
      </svg>

      <span className="mx-2 fw-semibold">CinemaCast</span>
      <div className="card w-25 h-25 p-4">
        <h4 className="card-title">Sign in</h4>
        <form className="d-flex flex-column" onSubmit={handleSubmit(signin)}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              id="username"
              {...register("username", {
                required: "Username is required",
              })}
              type="text"
              className={`form-control ${errors?.username && "is-invalid"} `}
            />
            <div className="invalid-feedback">{errors?.username?.message}</div>
          </div>
          <div className="mb-1">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              {...register("password", {
                required: "Password is required",
              })}
              type="password"
              className={`form-control ${errors?.password && "is-invalid"} `}
            />
            <div className="invalid-feedback">{errors?.password?.message}</div>
          </div>
          <div className="mb-4 form-text">
            <a href="#">Forgot It?</a>
          </div>
          <div className="mb-3 d-grid gap-2">
            <button className="btn btn-lg btn-primary">Sign in</button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default SignInPage;
