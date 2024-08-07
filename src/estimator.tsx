import { Formik, Form, Field, ErrorMessage } from 'formik';
import { object, number, string } from 'yup';

export const Estimator = () => {
    return (
        <div className='tw-text-white tw-border-solid tw-border-white tw-p-4 tw-rounded tw-max-w-[500px] tw-m-auto'>
            <h1 className="tw-text-[1.5rem] tw-mb-1">Sealant Estimator</h1>
            <p className='tw-m-0 tw-mb-4'>Estimate the amount of sealant needed for a project</p>
            <Formik
                initialValues={{
                    width: 0,
                    length: 0,
                    depth: 0,
                    widthUnit: 'in',
                    lengthUnit: 'in',
                    depthUnit: 'in',
                }}
                validationSchema={object({
                    width: number().required().min(0),
                    length: number().required().min(0),
                    depth: number().required().min(0),
                    widthUnit: string().oneOf(['in', 'ft', 'cm', 'm']).required(),
                    lengthUnit: string().oneOf(['in', 'ft', 'cm', 'm']).required(),
                    depthUnit: string().oneOf(['in', 'ft', 'cm', 'm']).required(),
                })}
                onSubmit={(values) => {
                    console.log(values);
                }}
            >
                <Form>
                    <div className='tw-mb-4 tw-flex tw-items-center'>
                        <label className='tw-m-0 tw-p-0 tw-mr-2 tw-min-w-[4rem]' htmlFor="width">Width</label>
                        <Field name="width" type="number" className='tw-mr-1 tw-p-1 tw-rounded tw-border-solid tw-border tw-border-white tw-bg-transparent tw-text-white tw-shadow-none tw-w-[50px]' />
                        <ErrorMessage name="width" />
                        <Field as="select" name="widthUnit" className='tw-ml-1 tw-p-1 tw-rounded tw-border tw-border-solid tw-border-white tw-text-white tw-bg-transparent tw-shadow-none'>
                            <option value="in">in</option>
                            <option value="ft">ft</option>
                            <option value="cm">cm</option>
                            <option value="m">m</option>
                        </Field>
                    </div>
                    <div className='tw-mb-4 tw-flex tw-items-center'>
                        <label className='tw-m-0 tw-p-0 tw-mr-2 tw-min-w-[4rem]' htmlFor="depth">Depth</label>
                        <Field name="depth" type="number" className='tw-mr-1 tw-p-1 tw-rounded tw-border-solid tw-border tw-border-white tw-bg-transparent tw-text-white tw-shadow-none tw-w-[50px]' />
                        <ErrorMessage name="depth" />
                        <Field as="select" name="depthUnit" className='tw-ml-1 tw-p-1 tw-rounded tw-border tw-border-solid tw-border-white tw-text-white tw-bg-transparent tw-shadow-none'>
                            <option value="in">in</option>
                            <option value="ft">ft</option>
                            <option value="cm">cm</option>
                            <option value="m">m</option>
                        </Field>
                    </div>
                    <div className='tw-mb-4 tw-flex tw-items-center'>
                        <label className='tw-m-0 tw-p-0 tw-mr-2 tw-min-w-[4rem]' htmlFor="length">Length</label>
                        <Field name="length" type="number" className='tw-mr-1 tw-p-1 tw-rounded tw-border-solid tw-border tw-border-white tw-bg-transparent tw-text-white tw-shadow-none tw-w-[50px]' />
                        <ErrorMessage name="length" />
                        <Field as="select" name="lengthUnit" className='tw-ml-1 tw-p-1 tw-rounded tw-border tw-border-solid tw-border-white tw-text-white tw-bg-transparent tw-shadow-none'>
                            <option value="in">in</option>
                            <option value="ft">ft</option>
                            <option value="cm">cm</option>
                            <option value="m">m</option>
                        </Field>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}
