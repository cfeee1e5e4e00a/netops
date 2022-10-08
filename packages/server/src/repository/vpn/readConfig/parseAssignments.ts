const assignmentRe = /(?<key>[^\s=]*)\s*=\s*(?<value>.*)/gm;

export const parseAssignments = <T extends Record<string, string>>(
    block: string
): T =>
    [...block.matchAll(assignmentRe)].reduce(
        (acc, { groups }) => ({
            ...acc,
            [groups!.key]: groups!.value,
        }),
        {} as T
    );
