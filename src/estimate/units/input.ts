export type InputUnit = 'in' | 'ft' | 'cm' | 'm'
export const inputUnits: InputUnit[] = ['in', 'ft', 'cm', 'm']

// Conversion factors from various units to meters
export const inputToMeters = {
    in: 0.0254,
    ft: 0.3048,
    cm: 0.01,
    m: 1,
}

