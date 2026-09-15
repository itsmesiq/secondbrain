export function createSpecializationAreaMap(
    specializations: Array<{ id: string; statsId: string }>,
) {
    return new Map(
        specializations.map(specialization => [specialization.id, specialization.statsId]),
    );
}
