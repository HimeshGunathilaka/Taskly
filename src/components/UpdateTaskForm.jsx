import { useEffect, useState } from "react";
import { usePublicContext } from "../context/Context";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  title: Yup.string().required("* Title is required"),
  category: Yup.string().required("* Category is required"),
  priority: Yup.string()
    .oneOf(["High", "Medium", "Low"])
    .required("* Priority is required"),
  status: Yup.string()
    .oneOf(["To do", "In progress", "Completed"])
    .required("* Status is required"),
  date: Yup.date().required("* Date is required").nullable(),
});

const UpdateTaskForm = () => {
  const { selectedTask } = usePublicContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (selectedTask) setIsLoading(false);
  }, [selectedTask]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Formik
      initialValues={{
        title: selectedTask?.title || "",
        category: selectedTask?.category || "",
        priority: selectedTask?.priority || "Low",
        status: selectedTask?.status || "To do",
        date: selectedTask?.date || "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        console.log("Updated task:", values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="d-flex flex-column update-task-form">
          <label className="mt-2" htmlFor="title">
            Title
          </label>
          <Field
            id="title"
            name="title"
            className="m-0 mt-2 px-2 py-1"
            placeholder="Enter your title"
          />
          <ErrorMessage name="title" component="div" className="error-text" />

          <label className="mt-2" htmlFor="category">
            Category
          </label>
          <Field
            as="select"
            id="category"
            name="category"
            className="m-0 mt-2 px-2 py-1"
          >
            <option value="">Select a category</option>
            <option value="Work">Work</option>
            <option value="Finance">Finance</option>
            <option value="Leisure">Leisure</option>
            <option value="Health">Health</option>
            <option value="Personal">Personal</option>
            <option value="Home">Home</option>
          </Field>
          <ErrorMessage
            name="category"
            component="div"
            className="error-text"
          />

          <label className="mt-2" htmlFor="priority">
            Priority
          </label>
          <Field
            as="select"
            id="priority"
            name="priority"
            className="m-0 mt-2 px-2 py-1"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </Field>
          <ErrorMessage
            name="priority"
            component="div"
            className="error-text"
          />

          <label className="mt-2" htmlFor="status">
            Status
          </label>
          <Field
            as="select"
            id="status"
            name="status"
            className="m-0 mt-2 px-2 py-1"
          >
            <option value="To do">To do</option>
            <option value="In progress">In progress</option>
            <option value="Completed">Completed</option>
          </Field>
          <ErrorMessage name="status" component="div" className="error-text" />

          <label className="mt-2" htmlFor="date">
            Date
          </label>
          <Field
            type="date"
            id="date"
            name="date"
            className="m-0 mt-2 px-2 py-1 date-picker"
          />
          <ErrorMessage name="date" component="div" className="error-text" />

          <button
            type="submit"
            className="submit-btn mt-3 py-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Please wait..." : "Submit"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateTaskForm;
