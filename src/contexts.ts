import { createContext } from "react";
import type { RequestMethod } from "./types";

export type FastifyJSXRouterContextType = {
	addRoute: (method: RequestMethod, path: string, handler: any) => void;
	removeRoute: (method: RequestMethod, path: string) => void;
};

export const fastifyJSXContext = createContext<FastifyJSXRouterContextType | null>(null);

export type RouterContextType = {
	path: string;
};

export const routerContext = createContext<RouterContextType | null>(null);
