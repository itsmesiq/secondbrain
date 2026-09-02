export const themes = ['light', 'dark'] as const;
export const colors = ['pink', 'purple', 'blue', 'green', 'yellow'] as const;

export type WidgetTheme = (typeof themes)[number];
export type WidgetColor = (typeof colors)[number];

export function getWidgetTheme(value: string | null): WidgetTheme {
    return themes.includes(value as WidgetTheme) ? (value as WidgetTheme) : 'dark';
}

export function getWidgetColor(value: string | null): WidgetColor {
    return colors.includes(value as WidgetColor) ? (value as WidgetColor) : 'purple';
}
