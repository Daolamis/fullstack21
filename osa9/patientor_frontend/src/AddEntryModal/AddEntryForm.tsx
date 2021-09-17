import { Field, Form, Formik } from 'formik';
import React from 'react';
import { Button, Divider, Grid } from 'semantic-ui-react';
import {
  DiagnosisSelection,
  HealthTypeSelection,
  NumberField,
  TextField,
} from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import { NewEntry } from '../types';
import { convertValuesToNewEntry, validateForm } from './entryUtil';

interface Props {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
}

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: 'HealthCheck',
        date: new Date().toISOString().slice(0, 10),
        specialist: '',
        description: '',
        diagnosisCodes: [],
        //HealthCheck
        healthCheckRating: 0,
        //OccupationalHealthcare
        employerName: '',
        sickleaveStartDate: '',
        sickleaveEndDate: '',
        //Hospital
        dischargeDate: '',
        dischargeCriteria: '',
      }}
      validate={(values) => {
        return validateForm(values);
      }}
      onSubmit={(val) => {
        const values = convertValuesToNewEntry(val);
        onSubmit(values);
      }}
    >
      {({ values, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <HealthTypeSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />
            <Field
              label="Date"
              placeholder="Date"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Divider />
            {values.type === 'HealthCheck' && (
              <Field
                label="HealthCheckRating"
                placeholder="HealthCheckRating"
                name="healthCheckRating"
                component={NumberField}
                min={0}
                max={3}
              />
            )}
            {values.type === 'OccupationalHealthcare' && (
              <>
                <Field
                  label="Employee"
                  placeholder="Employee"
                  name="employerName"
                  component={TextField}
                />
                <Field
                  label="Sick leave starting"
                  placeholder="Sick leave starting"
                  name="sickleaveStartDate"
                  component={TextField}
                />
                <Field
                  label="Sick leave ending"
                  placeholder="Sick leave ending"
                  name="sickleaveEndDate"
                  component={TextField}
                />
              </>
            )}
            {values.type === 'Hospital' && (
              <>
                <Field
                  label="Discharge date"
                  placeholder="Discharge date"
                  name="dischargeDate"
                  component={TextField}
                />
                <Field
                  label="Discharge criteria"
                  placeholder="Discharge criteria"
                  name="dischargeCriteria"
                  component={TextField}
                />
              </>
            )}

            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button type="submit" floated="right" color="green">
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
