import React from "react";
import { fireEvent, screen, act, waitFor } from "@testing-library/react";
import LoginTab from "./LoginTab";
import { render } from "../../test/test-utils";
import { createMemoryHistory } from "history";
import "@testing-library/jest-dom/extend-expect";
import configureStore from "../../store/configureStore";
import {
  startLoginAction,
  successLoginAction,
  failedLoginAction,
} from "../../store/actions/user-actions";
import { rest } from "msw";
import { setupServer } from "msw/node";
import axiosInstance from "../../services/axiosInstance";

const server = setupServer(
  rest.post("/user/login", (req, res, ctx) => {
    return res(
      ctx.delay(1500),
      ctx.status(500),
      ctx.json({
        username: "regularone",
        role: "regular",
        token: "example_token",
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  window.localStorage.removeItem("user");
});
afterAll(() => server.close());

test("disabled submit on invalid form", async () => {
  const { container } = render(<LoginTab />);

  fireEvent.change(screen.getByPlaceholderText("Username"), {
    target: {
      value: "berkelmas",
    },
  });
  await waitFor(() => {
    const submitButton = container.querySelector('button[type="submit"]');
    expect(submitButton).toBeDisabled();
  });
});

test("not disabled submit on filled form", async () => {
  const { container } = render(<LoginTab />);
  fireEvent.change(screen.getByPlaceholderText("Username"), {
    target: {
      value: "berkelmas",
    },
  });
  fireEvent.change(screen.getByPlaceholderText("Password"), {
    target: {
      value: "password",
    },
  });

  await waitFor(() => {
    const submitButton = container.querySelector('button[type="submit"]');
    expect(submitButton.disabled).toBe(false);
  });
});

test("login loading triggered", async () => {
  const { container } = render(<LoginTab />);
  const history = createMemoryHistory();
  history.push("/auth");
  fireEvent.change(container.querySelector('[placeholder="Username"]'), {
    target: {
      value: "berkelmas",
    },
  });
  fireEvent.change(container.querySelector('[placeholder="Password"]'), {
    target: {
      value: "password",
    },
  });
  fireEvent.click(container.querySelector('button[type="submit"]'));
  await waitFor(async () =>
    container.querySelector('button[type="submit"].ant-btn-loading')
  );
  expect(
    container.querySelector('button[type="submit"].ant-btn-loading')
  ).toBeInTheDocument();
});

test("login finished", async () => {
  const store = configureStore();
  const { container } = render(<LoginTab />, { initialState: null, store });
  store.dispatch = jest.fn();

  fireEvent.change(container.querySelector('[placeholder="Username"]'), {
    target: {
      value: "regularone",
    },
  });
  fireEvent.change(container.querySelector('[placeholder="Password"]'), {
    target: {
      value: "1234",
    },
  });
  fireEvent.click(container.querySelector('button[type="submit"]'));
  await waitFor(async () =>
    container.querySelector('button[type="submit"].ant-btn-loading')
  );
  expect(store.dispatch).toHaveBeenCalledWith(startLoginAction());
  await waitFor(async () =>
    expect(
      container.querySelector('button[type="submit"].ant-btn-loading')
    ).not.toBeInTheDocument()
  );
});
