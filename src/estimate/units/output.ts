export type OutputUnit = '5gal' | '2gal' | '1gal' | '3oz' | '1oz' | '10oz'
export const outputUnits: OutputUnit[] = ['1oz', '3oz', '10oz', '1gal', '2gal', '5gal']

// Conversion factors from cubic meters to various output units
export const cubicMetersToOutput = {
    '1oz': 33814,
    '3oz': 11271.4,
    '10oz': 3381.4,
    '1gal': 264.172,
    '2gal': 132.086,
    '5gal': 52.834,
}

export const getOutputUnitName = (unit: OutputUnit): string => {
    switch (unit) {
        case '1oz':
            return '1oz tubes'
        case '3oz':
            return '3oz tubes'
        case '10oz':
            return '10oz cartriges'
        case '1gal':
            return '1 gallon buckets'
        case '2gal':
            return '2 gallon buckets'
        case '5gal':
            return '5 gallon buckets'
        default:
            return ''
    }
}
