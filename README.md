# fastify-jsx-router

> A Fastify plugin to create stateful routes with React and JSX

This is a **_just-for-fun_** library to experiment with other use cases of React not related to user interfaces. This is not a helpful library for fastify applications! (This should go without saying 🙂).

fastify-jsx-router exposes components that you can use to scaffold your fastify routes. They allow you to register reactive route handlers on your fastify server.

## Install

```sh
npm i fastify-jsx-router
# or
yarn add fastify-jsx-router
# or
pnpm add fastify-jsx-router
```

## Usage

```tsx
import fastifyJSXRouter, { Route, Get, Post } from "fastify-jsx-router";

fastify.register(fastifyJSXRouter, {
	router: () => {
		<>
			<Route
				path="/"
				method="get"
				onRequest={(req, reply) => {
					return "Hello world!";
				}}
			/>

			<Route
				// path is "/" by default!
				method="post"
				onRequest={(req, reply) => {
					return "Created world!";
				}}
			/>

			{/* or use the Method components */}

			<Get
				onRequest={(req, reply) => {
					return "Hello world!";
				}}
			/>

			<Post
				onRequest={(req, reply) => {
					return "Created world!";
				}}
			/>

			{/* group routes within a router! */}

			<Router path="/users">
				<Get
					onRequest={(req, reply) => {
						return "All users!";
					}}
				/>
				<Post
					onRequest={(req, reply) => {
						return "Created user!";
					}}
				/>
			</Router>
		</>;
	},
});
```

## Examples

### Composability

Since fastify-jsx-router components are components, you can compose them in your own components!

Here is an example of creating an authenticated route.

```tsx
import Fastify { type FastifyReply, type FastifyRequest } from "fastify";
import fastifyJSX, { Get, Post, Route, Router } from "fastify-jsx-router";

const fastify = Fastify();

interface AuthenticatedRequestProps extends Omit<Route.Props, "onRequest"> {
	onRequest: (args: { req: FastifyRequest; reply: FastifyReply; user: { id: string } }) => any;
}

const AuthenticatedRoute = ({ onRequest, ...props }: AuthenticatedRequestProps) => {
	return (
		<Route
			onRequest={(req, reply) => {
				// normally, get the user from the request
				const user = { id: "123" };

				return onRequest({ req, reply, user });
			}}
			{...props}
		/>
	);
};

fastify.register(fastifyJSX, {
	router: () => {
		return (
			<>
				<AuthenticatedRoute
					path="/"
					method="get"
					onRequest={({ req, reply, user }) => {
						return `Hello ${user.id}`;
					}}
				/>
			</>
		);
	},
});
```

### State

Since fastify-jsx-router uses React, you are able to do some cool things (using state, context, or creating your own route components!)

Here is an example of dynamically registering routes based on state.

```tsx
import fastifyJSX, { Route } from "fastify-jsx-router";

const fastify = Fastify();

fastify.register(fastifyJSX, {
	router: () => {
		const [count, setCount] = useState(0);

		const shouldReset = count >= 5;

		return (
			<>
				<Route
					method={shouldReset ? "post" : "get"}
					onRequest={() => {
						if (shouldReset) {
							setCount(0);

							return "The count has been reset. You can increment it by sending a GET request to /";
						} else {
							const nextCount = count + 1;

							setCount(nextCount);

							if (nextCount >= 5) {
								return `The count is ${nextCount} and has been locked. You can now reset it by sending a POST request to /`;
							}

							return `The count is ${nextCount}`;
						}
					}}
				/>
			</>
		);
	},
});
```
