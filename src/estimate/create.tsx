import { Estimate } from "."
import { inputToMeters, InputUnit } from "./units/input"
import { cubicMetersToOutput, OutputUnit } from "./units/output"

export interface CreateEstimateOptions {
    width: number
    length: number
    depth: number
    widthUnit: InputUnit
    lengthUnit: InputUnit
    depthUnit: InputUnit
    outputUnit?: OutputUnit
}

export function createEstimate(options: CreateEstimateOptions): Estimate {
    // Convert dimensions to meters
    const widthInMeters = options.width * inputToMeters[options.widthUnit]
    const lengthInMeters = options.length * inputToMeters[options.lengthUnit]
    const depthInMeters = options.depth * inputToMeters[options.depthUnit]

    // Calculate the volume in cubic meters
    const volumeInCubicMeters = widthInMeters * lengthInMeters * depthInMeters

    // Determine the output unit if not provided
    const outputUnit = options.outputUnit || "10oz"

    // Convert the volume to the desired output unit
    const outputValue = volumeInCubicMeters * cubicMetersToOutput[outputUnit]

    return {
        value: outputValue,
        unit: outputUnit
    }
}
