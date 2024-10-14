import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import fastifyJSX, { Delete, Get, Post, Route, Router } from "./src";
import React, { useState } from "react";

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

fastify.listen({
	port: 3000,
});
