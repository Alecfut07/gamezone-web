import React, {
  render,
  screen,
  queryByAttribute,
  fireEvent,
  waitFor,
} from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import axios from "axios";
import SignInPage from "../SignInPage";

// jest.mock("axios");

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

// const mockedSetLoggedIn = jest.fn();

jest.mock("../../../context/AuthProvider", () => ({
  ...jest.requireActual("../../../context/AuthProvider"),
  setLoggedIn: () => true,
}));

describe("Tests in SignInPage", () => {
  test("renders email label", () => {
    render(<SignInPage />);
    const emailLabel = screen.getByLabelText("Email address");
    expect(emailLabel).toBeInTheDocument();
  });

  test("renders sign up button", async () => {
    render(<SignInPage />);
    const signInButton = await screen.findAllByRole("button");
    expect(signInButton).toHaveLength(1);
  });

  test("should render hint label with required input message for email when form is invalid", () => {
    const result = render(<SignInPage />);
    const getById = queryByAttribute.bind(null, "id");
    const signInButton = getById(result.container, "sign-in-button");
    fireEvent.click(signInButton);
    const emailHintErrorText = screen.getByText(
      /Please provide a valid email./i
    );
    expect(emailHintErrorText).toBeInTheDocument();
  });

  test("should render hint label with required input message for password when form is invalid", () => {
    const result = render(<SignInPage />);
    const getById = queryByAttribute.bind(null, "id");
    const signInButton = getById(result.container, "sign-in-button");
    fireEvent.click(signInButton);
    const passwordHintErrorText = screen.getByText(/Password is incorrect./i);
    expect(passwordHintErrorText).toBeInTheDocument();
  });

  test("should redirect user to sign up page when clicking on sign up link", () => {
    render(<SignInPage />);
    expect(screen.getByText("Register").closest("a")).toHaveAttribute(
      "href",
      "/users/sign_up"
    );
  });

  test("should render an error alert banner when trying to login with a user already registered and using the incorrect password", async () => {
    const result = render(<SignInPage />);
    // render(<SignInPage />);

    const emailInput = screen.getByPlaceholderText("Enter email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const getById = queryByAttribute.bind(null, "id");
    const signInButton = getById(result.container, "sign-in-button");
    // const signInButton = await screen.findAllByRole("button");

    // fireEvent.change(emailInput, "alec2@gmail.com");
    // fireEvent.change(passwordInput, "123");
    fireEvent.change(emailInput, {
      target: { value: "alec2@gmail.com" },
    });
    fireEvent.change(passwordInput, {
      target: { value: "123" },
    });
    fireEvent.click(signInButton);
    // await waitFor(() => expect(screen.getByRole("alert")).toBeInTheDocument());
    await waitFor(() => {
      const alertLogin = getById(result.container, "alert-login");
      expect(alertLogin).toBeInTheDocument();
    });
    // screen.debug(undefined, Infinity);

    // const alertLogin = getById(result.container, "alert-login");
    // const alertLogin = screen.getByText("Something went wrong!");
    // expect(alertLogin).toBeInTheDocument();
  });

  //   test("should redirect user to home page when submitting form", () => {
  //     const result = render(<SignInPage />);

  //     axios.post.mockResolvedValue({ data: "some data" });

  //     const emailInput = screen.getByPlaceholderText("Enter email");
  //     const passwordInput = screen.getByPlaceholderText("Password");
  //     const getById = queryByAttribute.bind(null, "id");
  //     const signUpButton = getById(result.container, "sign-up-button");

  //     fireEvent.change(emailInput, "alexis@gmail.com");
  //     fireEvent.change(passwordInput, "123456");
  //     fireEvent.click(signUpButton);

  //     expect(emailInput).toBeTruthy();
  //     expect(passwordInput).toBeTruthy();
  //     // screen.debug(undefined, Infinity);
  //     // screen.logTestingPlaygroundURL();
  //   });
});
