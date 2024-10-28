/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'; 

import { useState } from 'react';
import { Formik, Form, Field } from 'formik';

const SearchForm = ({ onSearch }) => {
    const [initialValues, setInitialValues] = useState({
        status: '',
        original_launch: '',
        type: '',
    });

    return (
        <>
    
            <div className="md:hidden bg-yellow-200 text-yellow-800 text-center p-4 mb-4 rounded">
                <p>This search functionality is only available on larger screens.</p>
            </div>

            <div className="hidden md:block"> 
                <Formik
                    initialValues={initialValues}
                    onSubmit={(values) => {
                        onSearch(values);
                    }}
                >
                    {() => (
                        <Form className="flex flex-col md:flex-row gap-4 p-0 md:p-6 rounded-lg shadow-md bg-white w-1/2 md:w-full px-0">
                            <div className="flex flex-col flex-1 w-full md:flex-initial md:max-w-xs">
                                <label htmlFor="status" className="text-gray-900 mb-2">Status</label>
                                <Field as="select" name="status" className="border border-gray-500 rounded p-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="">All</option>
                                    <option value="active">Active</option>
                                    <option value="retired">Retired</option>
                                    <option value="destroyed">Destroyed</option>
                                    <option value="unknown">Unknown</option>
                                </Field>
                            </div>

                            <div className="flex flex-col flex-1 w-full md:flex-initial md:max-w-xs">
                                <label htmlFor="original_launch" className="text-gray-900 mb-2">Original Launch</label>
                                <Field type="date" name="original_launch" className="border border-gray-500 rounded p-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>

                            <div className="flex flex-col flex-1 w-full md:flex-initial md:max-w-xs">
                                <label htmlFor="type" className="text-gray-900 mb-2">Type</label>
                                <Field as="select" name="type" className="border border-gray-500 rounded p-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="">All</option>
                                    <option value="Dragon 1.0">Dragon 1.0</option>
                                    <option value="Dragon 1.1">Dragon 1.1</option>
                                    <option value="Dragon 2.0">Dragon 2.0</option>
                                </Field>
                            </div>

                            <button type="submit" className="bg-slate-600 w-full md:w-16 text-white rounded-lg mt-0 md:mt-5 p-0 md:p-4 md:h-12 h-10 hover:bg-white hover:text-slate-900 hover:border border-slate-900 transition duration-200">
                                Filter
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
};

export default SearchForm;