import React, {
  fireEvent,
  render,
  screen,
  queryByAttribute,
} from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import axios from "axios";
import SignUpPage from "../SignUpPage";

jest.mock("axios"); // This overwrites axios methods with jest Mock

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("Tests in SignUpPage", () => {
  test("renders email label", () => {
    render(<SignUpPage />);
    const emailLabel = screen.getByLabelText("Email address");
    expect(emailLabel).toBeInTheDocument();
  });

  test("renders sign up button", async () => {
    render(<SignUpPage />);
    const signUpButton = await screen.findAllByRole("button");
    expect(signUpButton).toHaveLength(1);
  });

  test("should render hint label with required input message for email when form is invalid", () => {
    // const { getByTestId } = render(<SignUpPage />);
    // render(<SignUpPage />);
    // const signUpButton = screen.getByTestId("sign-up-button");
    const result = render(<SignUpPage />);
    const getById = queryByAttribute.bind(null, "id");
    const signUpButton = getById(result.container, "sign-up-button");
    fireEvent.click(signUpButton);
    const emailHintErrorText = screen.getByText(
      /Please provide a valid email./i
    );
    expect(emailHintErrorText).toBeInTheDocument();
  });

  test("should render error label with minimum characters message for password when form is invalid", () => {
    // const { getByText, getByTestId } = render(<SignUpPage />);
    // const signUpButton = getByTestId("sign-up-button");
    const result = render(<SignUpPage />);
    const getById = queryByAttribute.bind(null, "id");
    const signUpButton = getById(result.container, "sign-up-button");
    fireEvent.click(signUpButton);
    const passwordHintMinCharactersText = screen.getByText("Min 6 characters");
    expect(passwordHintMinCharactersText).toBeInTheDocument();
  });

  test("should render error label with max characters message for password when form is invalid", () => {
    // const { getByText, getByTestId } = render(<SignUpPage />);
    // const signUpButton = getByTestId("sign-up-button");
    const result = render(<SignUpPage />);
    const getById = queryByAttribute.bind(null, "id");
    const signUpButton = getById(result.container, "sign-up-button");
    fireEvent.click(signUpButton);
    const passwordHintMaxCharactersText = screen.getByText("Max 20 characters");
    expect(passwordHintMaxCharactersText).toBeInTheDocument();
  });

  test("should redirect user to sign in page when clicking on sign in link", () => {
    render(<SignUpPage />);
    // const signUpButton = screen.getByTestId("sign-up-button");
    // console.log(screen.getByText("Sign In").closest("a"));
    const signInPage = screen.getByText("Sign In").closest("a");
    // console.log(signInPage);
    fireEvent.click(signInPage);
    // expect(screen.getByText("Sign In").closest("a")).toHaveAttribute(
    //   "href",
    //   "/users/sign_in"
    // );

    // await expect(mockedNavigate).toHaveBeenCalledWith("/users/sign_in");
    expect(mockedNavigate).toHaveBeenCalledWith(1);
  });

  // test("should redirect user to home page when submitting form", () => {
  //   const result = render(<SignUpPage />);

  //   axios.post.mockResolvedValue({ data: "some data" });

  //   const emailInput = screen.getByPlaceholderText("Enter email");
  //   const passwordInput = screen.getByPlaceholderText("Password");
  //   const getById = queryByAttribute.bind(null, "id");
  //   const signUpButton = getById(result.container, "sign-up-button");

  //   // userEvent.type(emailInput, "alexis@gmail.com");
  //   // userEvent.type(passwordInput, "123456");
  //   // userEvent.change(emailInput, "alexis@gmail.com");
  //   // userEvent.change(passwordInput, "123456");

  //   fireEvent.change(emailInput, "alexis@gmail.com");
  //   fireEvent.change(passwordInput, "123456");
  //   fireEvent.click(signUpButton);

  //   expect(emailInput).toBeTruthy();
  //   expect(passwordInput).toBeTruthy();

  //   // screen.debug(undefined, Infinity);
  //   // screen.logTestingPlaygroundURL();
  // });
});
