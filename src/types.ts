import type { FastifyReply, FastifyRequest } from "fastify";

export type RequestMethod = "get" | "post" | "put" | "delete" | "patch" | "head" | "options";

export type RequestHandler = (req: FastifyRequest, res: FastifyReply) => any;
