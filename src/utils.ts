export function joinPaths(...parts: string[]): string {
	let path = parts[0]!;

	// Remove trailing slash from the current path if it exists
	path = path.replace(/\/+$/, "");

	for (let i = 1; i < parts.length; i++) {
		let part = parts[i]!;

		if (part.endsWith("/")) {
			if (part.length === 1) {
				continue;
			}

			// remove the ending slash
			part = part.substring(1, part.length - 1);
		}

		if (part.startsWith("/")) {
			path += part;
		} else {
			path += "/" + part;
		}
	}

	return path;
}
