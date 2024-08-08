import { Formik, Form, Field, ErrorMessage, FormikContext } from 'formik'
import { object, number, string } from 'yup'
import { createEstimate, CreateEstimateOptions } from '../estimate/create'
import { Estimate } from '../estimate'
import React, { Dispatch, SetStateAction, useContext, useEffect } from 'react'
import { getOutputUnitName, OutputUnit, outputUnits } from '../estimate/units/output'
import { ChevronDown } from '../icons/chevron-down'

export const Estimator = () => {
    const [estimate, setEstimate] = React.useState<Estimate | null>(null)
    const [outputUnit, setOutputUnit] = React.useState<OutputUnit>("10oz")

    return (
        <div className='tw-text-white tw-border-solid tw-border-white tw-p-[1.5rem] tw-rounded tw-max-w-[500px] tw-m-auto'>
            <div>
                <h1 className="tw-text-[1.5rem] tw-mb-1 tw-mt-0">Sealant Estimator</h1>
                <p className='tw-m-0 tw-mb-4'>Estimate the amount of sealant needed for a project</p>
                <Formik<CreateEstimateOptions>
                    initialValues={{
                        width: 0,
                        length: 0,
                        depth: 0,
                        widthUnit: 'in',
                        lengthUnit: 'in',
                        depthUnit: 'in'
                    }}
                    validationSchema={object({
                        width: number().required().positive(),
                        length: number().required().positive(),
                        depth: number().required().positive(),
                        widthUnit: string().oneOf(['in', 'ft', 'cm', 'm']).required(),
                        lengthUnit: string().oneOf(['in', 'ft', 'cm', 'm']).required(),
                        depthUnit: string().oneOf(['in', 'ft', 'cm', 'm']).required(),
                    })}
                    onSubmit={(values) => {
                        setEstimate(createEstimate({ ...values, outputUnit }))
                    }}
                >
                    <EstimatorForm estimate={estimate} setEstimate={setEstimate} setOutputUnit={setOutputUnit} outputUnit={outputUnit} />
                </Formik>
            </div>
        </div>
    )
}

export const EstimatorForm = (props: { estimate: Estimate | null, setEstimate: Dispatch<SetStateAction<Estimate | null>>, setOutputUnit: (unit: OutputUnit) => void, outputUnit: OutputUnit }) => {
    const [showDropdown, setShowDropdown] = React.useState(false)
    const optionsRef = React.useRef<HTMLDivElement>(null)
    const ctx = useContext(FormikContext)

    useEffect(() => {
        function handleOptionChange() {
            props.setEstimate(null)
        }

        optionsRef.current?.addEventListener('input', handleOptionChange)

        return () => {
            optionsRef.current?.removeEventListener('input', handleOptionChange)
        }
    }, [])

    return (
        <Form>
            <div ref={optionsRef}>
                <div className='tw-mb-4'>
                    <div className='tw-flex tw-items-center'>
                        <label className='tw-m-0 tw-p-0 tw-mr-2 tw-min-w-[4rem]' htmlFor="width">Width</label>
                        <Field name="width" type="number" className='tw-mr-1 tw-p-1 tw-rounded tw-border-solid tw-border tw-border-white tw-bg-transparent tw-text-white tw-shadow-none tw-w-[50px]' />
                        <Field as="select" name="widthUnit" className='tw-ml-1 tw-p-1 tw-rounded tw-border tw-border-solid tw-border-white tw-text-white tw-bg-transparent tw-shadow-none'>
                            <option value="in">in</option>
                            <option value="ft">ft</option>
                            <option value="cm">cm</option>
                            <option value="m">m</option>
                        </Field>
                    </div>
                    <span className='tw-text-red-500'>
                        <ErrorMessage name="width" />
                    </span>
                </div>
                <div className='tw-mb-4'>
                    <div className='tw-flex tw-items-center'>
                        <label className='tw-m-0 tw-p-0 tw-mr-2 tw-min-w-[4rem]' htmlFor="depth">Depth</label>
                        <Field name="depth" type="number" className='tw-mr-1 tw-p-1 tw-rounded tw-border-solid tw-border tw-border-white tw-bg-transparent tw-text-white tw-shadow-none tw-w-[50px]' />
                        <Field as="select" name="depthUnit" className='tw-ml-1 tw-p-1 tw-rounded tw-border tw-border-solid tw-border-white tw-text-white tw-bg-transparent tw-shadow-none'>
                            <option value="in">in</option>
                            <option value="ft">ft</option>
                            <option value="cm">cm</option>
                            <option value="m">m</option>
                        </Field>
                    </div>
                    <span className='tw-text-red-500'>
                        <ErrorMessage name="depth" />
                    </span>
                </div>
                <div>
                    <div className='tw-flex tw-items-center'>
                        <label className='tw-m-0 tw-p-0 tw-mr-2 tw-min-w-[4rem]' htmlFor="length">Length</label>
                        <Field name="length" type="number" className='tw-mr-1 tw-p-1 tw-rounded tw-border-solid tw-border tw-border-white tw-bg-transparent tw-text-white tw-shadow-none tw-w-[50px]' />
                        <Field as="select" name="lengthUnit" className='tw-ml-1 tw-p-1 tw-rounded tw-border tw-border-solid tw-border-white tw-text-white tw-bg-transparent tw-shadow-none'>
                            <option value="in">in</option>
                            <option value="ft">ft</option>
                            <option value="cm">cm</option>
                            <option value="m">m</option>
                        </Field>
                    </div>
                    <span className='tw-text-red-500'>
                        <ErrorMessage name="length" />
                    </span>
                </div>
            </div>
            <button className='tw-shadow tw-mt-4 tw-py-2 tw-px-4 tw-text-lg tw-cursor-pointer tw-border-none tw-rounded tw-bg-orange-700 tw-text-white hover:tw-bg-orange-800 tw-transition-colors' type="submit">Estimate</button>
            {
                props.estimate && (
                    <div>
                        <hr className='tw-mt-4' />
                        <div className='tw-mt-4 tw-flex tw-items-center tw-gap-[1rem]'>
                            <p className='tw-m-0 tw-p-0'>Amount:</p>
                            <code className='tw-m-0 tw-p-0'>{props.estimate.value.toFixed(2)}</code>
                            <span onClick={() => setShowDropdown(s => !s)} className='tw-relative tw-cursor-pointer tw-font-bold tw-border tw-border-solid tw-flex tw-rounded tw-gap-1 tw-items-center tw-border-opacity-50 tw-m-0 tw-p-0 tw-px-1'>
                                {getOutputUnitName(props.estimate.unit)}
                                <ChevronDown />
                                {showDropdown && (
                                    <div className="tw-absolute tw-rounded tw-shadow tw-top-4 tw-bg-gray-700 tw-text-white">
                                        {
                                            outputUnits.map(unit => (
                                                <div key={unit} className='tw-w-[200px] tw-p-2 tw-cursor-pointer hover:tw-bg-gray-800' onClick={(e) => {
                                                    e.stopPropagation()
                                                    setShowDropdown(false)
                                                    props.setOutputUnit(unit)
                                                }}>
                                                    {getOutputUnitName(unit)}
                                                </div>
                                            ))
                                        }
                                    </div>
                                )}
                            </span>
                        </div>
                    </div>
                )
            }
        </Form>
    )
}
