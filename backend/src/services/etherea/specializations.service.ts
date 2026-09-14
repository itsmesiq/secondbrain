export function createSpecializationAreaMap(
    specializations: Array<{ id: string; areaId: string }>,
) {
    return new Map(
        specializations.map(specialization => [specialization.id, specialization.areaId]),
    );
}
