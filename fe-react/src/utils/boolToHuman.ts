type BoolAsHuman = 'Yes' | 'No';

export const boolToHuman = (value: boolean): BoolAsHuman => value ? 'Yes' : 'No';
