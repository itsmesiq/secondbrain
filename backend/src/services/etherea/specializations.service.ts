export function createSpecializationAreaMap(
    specializations: Array<{ id: string; areaId: string }>,
) {
    return new Map(
        specializations.map(specializations => [specializations.id, specializations.areaId]),
    );
}
