import { CreateEstimateOptions, createEstimate } from "./create"
import { cubicMetersToOutput } from "./units/output"

describe('createEstimate', () => {
    it('should correctly calculate volume and convert to the desired output unit', () => {
        const options: CreateEstimateOptions = {
            width: 2,
            length: 3,
            depth: 4,
            widthUnit: 'm',
            lengthUnit: 'm',
            depthUnit: 'm',
            outputUnit: '1gal'
        }

        const result = createEstimate(options)

        const expectedVolumeInCubicMeters = 2 * 3 * 4
        const expectedOutputValue = expectedVolumeInCubicMeters * cubicMetersToOutput['1gal']

        expect(result.value).toBe(expectedOutputValue)
        expect(result.unit).toBe('1gal')
    })
})
