import { routerContext } from "../contexts";
import { useRouterContext } from "../hooks";
import { joinPaths } from "../utils";
import type { PropsWithChildren } from "react";

export declare namespace Router {
	interface Props extends PropsWithChildren {
		path?: string;
	}
}

export const Router = ({ path, children }: Router.Props) => {
	const routerCtx = useRouterContext();

	const routerPath = path ? joinPaths(routerCtx.path, path) : routerCtx.path;

	return <routerContext.Provider value={{ path: routerPath }}>{children}</routerContext.Provider>;
};
