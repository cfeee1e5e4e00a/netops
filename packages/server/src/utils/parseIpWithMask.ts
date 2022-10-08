import { IP, IPWithMask } from '@shared/vpn';

export const ipWithMaskRE =
    /(?<ip>[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3})\/(?<mask>[0-9]{1,2})/gm;

export const parseIpWithMask = (
    ipWithMask: IPWithMask
): { ip: IP; mask: number } => {
    const { ip, mask } = [...ipWithMask.matchAll(ipWithMaskRE)][0].groups!;

    return { ip, mask: Number(mask) };
};
