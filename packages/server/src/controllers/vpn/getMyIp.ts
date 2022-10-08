import { FastifyRequest } from 'fastify';

export const getMyIp = async ({ ip }: FastifyRequest) => {
    return { ip };
};
