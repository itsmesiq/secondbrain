export const formatDueDate = (date: string) => {
    const [year, month, day] = date.split('T')[0].split('-');
    if (!year || !month || !day) return date;
    return `${day}/${month}/${year}`;
};
