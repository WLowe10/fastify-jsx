import { Route } from "./route";

export declare namespace Get {
	type Props = Omit<Route.Props, "method">;
}

export const Get = (props: Get.Props) => {
	return <Route method="get" {...props} />;
};

export declare namespace Post {
	type Props = Omit<Route.Props, "method">;
}

export const Post = (props: Post.Props) => {
	return <Route method="post" {...props} />;
};

export declare namespace Put {
	type Props = Omit<Route.Props, "method">;
}

export const Put = (props: Put.Props) => {
	return <Route method="put" {...props} />;
};

export declare namespace Patch {
	type Props = Omit<Route.Props, "method">;
}

export const Patch = (props: Patch.Props) => {
	return <Route method="patch" {...props} />;
};

export declare namespace Delete {
	type Props = Omit<Route.Props, "method">;
}

export const Delete = (props: Delete.Props) => {
	return <Route method="delete" {...props} />;
};

export declare namespace Head {
	type Props = Omit<Route.Props, "method">;
}

export const Head = (props: Head.Props) => {
	return <Route method="head" {...props} />;
};

export declare namespace Options {
	type Props = Omit<Route.Props, "method">;
}

export const Options = (props: Options.Props) => {
	return <Route method="options" {...props} />;
};
