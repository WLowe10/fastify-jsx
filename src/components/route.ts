import { useEffect } from "react";
import { useFastifyJSXRouterContext, useRouterContext } from "../hooks";
import { joinPaths } from "../utils";
import type { FastifyRequest, FastifyReply } from "fastify";
import type { RequestMethod } from "../types";

export declare namespace Route {
	interface Props {
		path?: string;
		method: RequestMethod;
		onRequest: (req: FastifyRequest, res: FastifyReply) => any;
	}
}

export const Route = ({ method, path, onRequest }: Route.Props) => {
	const fastifyJSXCtx = useFastifyJSXRouterContext();
	const router = useRouterContext();

	const routePath = path ? joinPaths(router.path, path) : router.path;

	useEffect(() => {
		fastifyJSXCtx.addRoute(method, routePath, onRequest);

		return () => {
			fastifyJSXCtx.removeRoute(method, routePath);
		};
	}, [method, path, onRequest]);

	return null;
};
