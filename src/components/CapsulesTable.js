/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useEffect, useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import SearchForm from './SearchForm';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Toast } from 'primereact/toast';
import { FaPlus } from 'react-icons/fa';

// Validation schema
const validationSchema = Yup.object().shape({
  capsule_serial: Yup.string().required('Capsule Serial is required'),
  status: Yup.string().required('Status is required'),
  original_launch: Yup.date().required('Original Launch is required').nullable(),
  type: Yup.string().required('Type is required'),
});

const CapsulesTable = ({ capsules: propCapsules, setCapsules }) => {
  const [filteredCapsules, setFilteredCapsules] = useState([]);
  const [editedCapsule, setEditedCapsule] = useState(null);
  const [visible, setVisible] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [capsuleToDelete, setCapsuleToDelete] = useState(null);
  const [addDialogVisible, setAddDialogVisible] = useState(false);
  const [detailDialogVisible, setDetailDialogVisible] = useState(false);
  const [selectedCapsule, setSelectedCapsule] = useState(null);
  const toast = useRef(null);

  useEffect(() => {
    setFilteredCapsules(propCapsules);
  }, [propCapsules]);

  useEffect(() => {
    const fetchCapsules = async () => {
      const response = await fetch('https://api.spacexdata.com/v3/capsules');
      const data = await response.json();
      setCapsules(data);
      setFilteredCapsules(data);
    };

    fetchCapsules();
  }, [setCapsules]);

  const handleSearch = (filters) => {
    let filtered = propCapsules;

    if (filters.status) {
      filtered = filtered.filter(capsule => capsule.status === filters.status);
    }

    if (filters.original_launch) {
      filtered = filtered.filter(capsule =>
        new Date(capsule.original_launch).toDateString() === new Date(filters.original_launch).toDateString()
      );
    }

    if (filters.type) {
      filtered = filtered.filter(capsule => capsule.type === filters.type);
    }

    setFilteredCapsules(filtered);
  };

  const openEditDialog = (capsule) => {
    setEditedCapsule(capsule);
    setVisible(true);
  };

  const saveChanges = (values) => {
    setCapsules((prevCapsules) =>
      prevCapsules.map((capsule) => (capsule.capsule_serial === values.capsule_serial ? values : capsule))
    );
    setVisible(false);
    setEditedCapsule(null);

    toast.current.show({
      severity: 'success',
      summary: 'Success',
      detail: 'Changes saved locally',
      life: 3000,
      className: 'bg-green-500 text-white rounded-lg p-4',
    });
  };

  const addCapsule = (values) => {
    const newCapsule = { ...values, reuse_count: 0 }; 
    setCapsules((prevCapsules) => [...prevCapsules, newCapsule]);
    setAddDialogVisible(false);

    toast.current.show({
      severity: 'success',
      summary: 'Success',
      detail: 'Capsule added successfully',
      life: 3000,
      className: 'bg-green-500 text-white rounded-lg p-4',
    });
  };

  const confirmDelete = (capsule) => {
    setCapsuleToDelete(capsule);
    setDeleteDialogVisible(true);
  };

  const deleteCapsule = () => {
    setCapsules((prevCapsules) => {
      const updatedCapsules = prevCapsules.filter(capsule => capsule.capsule_serial !== capsuleToDelete.capsule_serial);
      return updatedCapsules;
    });

    toast.current.show({
      severity: 'success',
      summary: 'Success',
      detail: 'Capsule deleted successfully',
      life: 3000,
      className: 'bg-green-500 text-white rounded-lg p-4',
    });

    setDeleteDialogVisible(false);
    setCapsuleToDelete(null);
  };

  const showDetailDialog = (capsule) => {
    setSelectedCapsule(capsule);
    setDetailDialogVisible(true);
  };

  const getMissionCount = (missions) => {
    return missions?.length || 0;
  };

  return (
    <div className="p-6 max-w-full overflow-x-auto">
      <Toast ref={toast} />
      <div className="flex flex-col md:flex-row mb-4 p-0 md:p-4">
        <div className="flex-grow w-full md:w-1/2 pr-2 mb-2 md:mb-0">
          <SearchForm onSearch={handleSearch} />
        </div>
        <button
          onClick={() => setAddDialogVisible(true)}
          className="hidden md:block bg-gray-500 text-white rounded-full items-center md:p-3 p-1 w-10 md:w-auto"
        >
          <FaPlus className="md:text-2xl text-md" />
        </button>
      </div>

      <h2 className="text-3xl font-semibold mb-4 pt-4">Capsules</h2>

      <div className="overflow-y-auto max-h-[400px]">
            <div className="hidden md:block">
                <DataTable
                    value={filteredCapsules}
                    paginator
                    rows={5}
                    className="bg-white border-none"
                    tableClassName="border-none"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} capsules"
                    paginatorClassName="flex justify-between items-center p-4 bg-gray-200 rounded-b-lg border-t border-gray-300"
                    rowClassName="border-b border-light-gray cursor-pointer"
                    onRowClick={(e) => showDetailDialog(e.data)}
                >
                    <Column
                        field="capsule_serial"
                        header="Capsule Serial"
                        bodyStyle={{ padding: '16px' }}
                        headerStyle={{ padding: '16px' }}
                    />
                    <Column
                        field="status"
                        header="Status"
                        bodyStyle={{ padding: '16px' }}
                        headerStyle={{ padding: '16px' }}
                        className="hidden md:table-cell text-xs md:text-xl" 
                    />
                    <Column
                        field="original_launch"
                        header="Original Launch"
                        body={(rowData) => new Date(rowData.original_launch).toLocaleDateString()}
                        bodyStyle={{ padding: '16px' }}
                        headerStyle={{ display: 'table-cell' }} 
                        className="hidden md:table-cell text-xs md:text-xl" 
                    />
                    <Column
                        field="type"
                        header="Type"
                        bodyStyle={{ padding: '16px' }}
                        className="hidden md:table-cell text-xs md:text-xl" 
                    />
                    <Column
                        header="No. of Missions"
                        body={(rowData) => getMissionCount(rowData.missions)}
                        bodyStyle={{ padding: '16px' }}
                        className="hidden md:table-cell text-xs md:text-xl" 
                    />
                    <Column
                        body={(rowData) => (
                            <div className="flex space-x-2">
                                <Button
                                    label="Edit"
                                    icon="pi pi-pencil"
                                    onClick={() => openEditDialog(rowData)}
                                    className="text-black underline"
                                />
                                <Button
                                    label="Delete"
                                    icon="pi pi-trash"
                                    onClick={() => confirmDelete(rowData)}
                                    className="text-black underline"
                                />
                            </div>
                        )}
                        header=""
                        bodyStyle={{ padding: '16px' }}
                    />
                </DataTable>
            </div>

            
            <div className="md:hidden text-center p-4">
                <p>This table is not available on small screens. Please use a larger device.</p>
            </div>
        </div>


      {/* Edit Capsule Dialog */}
      <Dialog
        header={<div className="font-bold text-xl p-4"> Edit Capsule Details </div>}
        visible={visible}
        onHide={() => setVisible(false)}
        footer={
          <Button label="Close" icon="pi pi-times" onClick={() => setVisible(false)} className="text-black underline" />
        }
        style={{ width: '90%', maxWidth: '600px', backgroundColor: '#f0f0f0' }}
        className="p-6"
      >
        {editedCapsule && (
          <Formik
            initialValues={editedCapsule}
            validationSchema={validationSchema}
            onSubmit={saveChanges}
          >
            {({ errors, touched }) => (
              <Form className="flex flex-col space-y-3">
                <div className="p-field">
                  <label htmlFor="capsule_serial" className="block mb-1">Capsule Serial</label>
                  <Field
                    name="capsule_serial"
                    as={InputText}
                    className={`border border-gray-300 rounded p-2 w-full ${errors.capsule_serial && touched.capsule_serial ? 'border-red-500' : ''}`}
                  />
                  <ErrorMessage name="capsule_serial" component="small" className="p-error" />
                </div>

                <div className="p-field">
                  <label htmlFor="status" className="block mb-1">Status</label>
                  <Field
                    name="status"
                    as="select"
                    className={`border border-gray-300 rounded p-2 w-full ${errors.status && touched.status ? 'border-red-500' : ''}`}
                  >
                    <option value="">Select Status</option>
                    <option value="active">Active</option>
                    <option value="retired">Retired</option>
                    <option value="destroyed">Destroyed</option>
                    <option value="unknown">Unknown</option>
                  </Field>
                  <ErrorMessage name="status" component="small" className="p-error" />
                </div>

                <div className="p-field">
                  <label htmlFor="original_launch" className="block mb-1">Original Launch</label>
                  <Field
                    name="original_launch"
                    type="date"
                    className={`border border-gray-300 rounded p-2 w-full ${errors.original_launch && touched.original_launch ? 'border-red-500' : ''}`}
                  />
                  <ErrorMessage name="original_launch" component="small" className="p-error" />
                </div>

                <div className="p-field">
                  <label htmlFor="type" className="block mb-1">Type</label>
                  <Field
                    name="type"
                    as="select"
                    className={`border border-gray-300 rounded p-2 w-full ${errors.type && touched.type ? 'border-red-500' : ''}`}
                  >
                    <option value="">Select Type</option>
                    <option value="Dragon 1.0">Dragon 1.0</option>
                    <option value="Dragon 1.1">Dragon 1.1</option>
                    <option value="Dragon 2.0">Dragon 2.0</option>
                  </Field>
                  <ErrorMessage name="type" component="small" className="p-error" />
                </div>

                <Button type="submit" label="Save Changes" className="bg-green-600 text-white mt-4 w-40 h-10 rounded-lg hover:bg-green-700 transition duration-200" />
              </Form>
            )}
          </Formik>
        )}
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        header={<div className="font-bold font-xl p-4"> Confirm deletion </div>}
        visible={deleteDialogVisible}
        onHide={() => setDeleteDialogVisible(false)}
        footer={
          <div>
            <Button label="No" icon="pi pi-times" onClick={() => setDeleteDialogVisible(false)} className="text-black rounded-lg bg-red-500 w-10 h-10 " />
            <Button label="Yes" icon="pi pi-check" onClick={deleteCapsule} className="text-white rounded-lg bg-green-500 w-10 h-10" />
          </div>
        }
        style={{ width: '90%', maxWidth: '400px', backgroundColor: '#f0f0f0' }}
        className="p-6"
      >
        <p>Are you sure you want to delete this capsule?</p>
      </Dialog>

      {/* Add New Capsule Dialog */}
      <Dialog
        header={<div className="font-bold text-xl p-4">Add New Capsule</div>}
        visible={addDialogVisible}
        onHide={() => setAddDialogVisible(false)}
        footer={
          <Button label="Cancel" icon="pi pi-times" onClick={() => setAddDialogVisible(false)} className="text-black" />
        }
        style={{ width: '90%', maxWidth: '600px', height: '500px', backgroundColor: '#f0f0f0' }}
        className="p-6"
      >
        <Formik
          initialValues={{
            capsule_serial: '',
            status: '',
            original_launch: '',
            type: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            addCapsule(values);
            resetForm();
          }}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col space-y-3">
              <div className="p-field">
                <label htmlFor="capsule_serial" className="block mb-1">Capsule Serial</label>
                <Field
                  name="capsule_serial"
                  as={InputText}
                  className={`border border-gray-300 rounded p-2 w-full ${errors.capsule_serial && touched.capsule_serial ? 'border-red-500' : ''}`}
                />
                <ErrorMessage name="capsule_serial" component="small" className="p-error" />
              </div>

              <div className="p-field">
                <label htmlFor="status" className="block mb-1">Status</label>
                <Field
                  name="status"
                  as="select"
                  className={`border border-gray-300 rounded p-2 w-full ${errors.status && touched.status ? 'border-red-500' : ''}`}
                >
                  <option value="">Select Status</option>
                  <option value="active">Active</option>
                  <option value="retired">Retired</option>
                  <option value="destroyed">Destroyed</option>
                  <option value="unknown">Unknown</option>
                </Field>
                <ErrorMessage name="status" component="small" className="p-error" />
              </div>

              <div className="p-field">
                <label htmlFor="original_launch" className="block mb-1">Original Launch</label>
                <Field
                  name="original_launch"
                  type="date"
                  className={`border border-gray-300 rounded p-2 w-full ${errors.original_launch && touched.original_launch ? 'border-red-500' : ''}`}
                />
                <ErrorMessage name="original_launch" component="small" className="p-error" />
              </div>

              <div className="p-field">
                <label htmlFor="type" className="block mb-1">Type</label>
                <Field
                  name="type"
                  as="select"
                  className={`border border-gray-300 rounded p-2 w-full ${errors.type && touched.type ? 'border-red-500' : ''}`}
                >
                  <option value="">Select Type</option>
                  <option value="Dragon 1.0">Dragon 1.0</option>
                  <option value="Dragon 1.1">Dragon 1.1</option>
                  <option value="Dragon 2.0">Dragon 2.0</option>
                </Field>
                <ErrorMessage name="type" component="small" className="p-error" />
              </div>

              <Button type="submit" label="Add Capsule" className="bg-green-600 text-white mt-4 w-52 h-10 rounded-lg hover:bg-green-700 transition duration-200" />
            </Form>
          )}
        </Formik>
      </Dialog>

      {/* Capsule Detail Dialog */}
      <Dialog
        header={<div className="font-bold text-xl p-4">Capsule Details</div>}
        visible={detailDialogVisible}
        onHide={() => setDetailDialogVisible(false)}
        footer={<Button label="Close" icon="pi pi-times" onClick={() => setDetailDialogVisible(false)} className="text-white rounded-lg bg-red w-10 h-10" />}
        style={{ width: '90%', maxWidth: '400px', height: '400px', backgroundColor: '#f0f0f0' }}
        className="p-6 rounded-lg"
      >
        {selectedCapsule && (
          <div>
            <p className='pt-4 pb-5'><strong>Capsule Serial:</strong> {selectedCapsule.capsule_serial}</p>
            <p className='pb-5'><strong>Status:</strong> {selectedCapsule.status}</p>
            <p className='pb-5'><strong>Original Launch:</strong> {new Date(selectedCapsule.original_launch).toLocaleDateString()}</p>
            <p className='pb-5'><strong>Type:</strong> {selectedCapsule.type}</p>
            <p className='pb-5'><strong>No. of Missions:</strong> {getMissionCount(selectedCapsule.missions)}</p>
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default CapsulesTable;