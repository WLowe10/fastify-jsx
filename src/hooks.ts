import { useContext } from "react";
import { fastifyJSXContext, routerContext } from "./contexts";

export const useFastifyJSXRouterContext = () => {
	const ctx = useContext(fastifyJSXContext);

	if (!ctx) {
		throw new Error(
			"useFastifyJSXRouterContext must be used within the fastify-jsx-router context"
		);
	}

	return ctx;
};

export const useRouterContext = () => {
	const ctx = useContext(routerContext);

	if (!ctx) {
		throw new Error("useRouterContext must be used within a Router");
	}

	return ctx;
};
