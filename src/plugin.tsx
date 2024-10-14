import { render } from "react-nil";
import { fastifyJSXContext, routerContext } from "./contexts";
import type { FastifyInstance } from "fastify";
import type { RequestHandler, RequestMethod } from "./types";

export declare namespace fastifyJSXRouter {
	interface Options {
		router: React.ElementType;
	}
}

export async function fastifyJSXRouter(fastify: FastifyInstance, opts: fastifyJSXRouter.Options) {
	const routeMaps: Record<RequestMethod, Map<string, RequestHandler>> = {
		get: new Map<string, any>(),
		post: new Map<string, any>(),
		put: new Map<string, any>(),
		patch: new Map<string, any>(),
		delete: new Map<string, any>(),
		head: new Map<string, any>(),
		options: new Map<string, any>(),
	} as const;

	const addRoute = (method: keyof typeof routeMaps, path: string, handler: () => any) => {
		const routeMap = routeMaps[method];

		routeMap.set(path, handler);
	};

	const removeRoute = (method: keyof typeof routeMaps, path: string) => {
		const routeMap = routeMaps[method];

		routeMap.delete(path);
	};

	render(
		<fastifyJSXContext.Provider value={{ addRoute, removeRoute }}>
			<routerContext.Provider value={{ path: "/" }}>
				<opts.router />
			</routerContext.Provider>
		</fastifyJSXContext.Provider>
	);

	fastify.all("*", (req, reply) => {
		const url = req.url;
		const method = req.method.toLowerCase();

		const routeMap = routeMaps[method as RequestMethod];

		if (!routeMap) {
			throw new Error(`${method} requests are not supported by fastify-jsx-router-router`);
		}

		const handler = routeMap.get(url);

		if (!handler) {
			return "Not Found";
		}

		return handler(req, reply);
	});
}
