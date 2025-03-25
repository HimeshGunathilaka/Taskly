import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import service from "../services/service";
import { usePublicContext } from "../context/Context";

const validationSchema = Yup.object({
  title: Yup.string().required("* Title is required"),
  category: Yup.string()
    .oneOf(["Work", "Finance", "Leisure", "Health", "Personal", "Home"])
    .required("* Category is required"),
  priority: Yup.string()
    .oneOf(["High", "Medium", "Low"])
    .required("* Priority is required"),
  status: Yup.string()
    .oneOf(["To do", "In progress", "Completed"])
    .required("* Status is required"),
  date: Yup.date().required("* Date is required").nullable(),
});

const CreateTaskForm = () => {
  const { alert, refreshTasks, setOpenPopup } = usePublicContext();

  const handleSubmit = async (values, setSubmitting, resetForm) => {
    try {
      const result = await service.createTask({
        user_id: localStorage.getItem("user-id"),
        title: values.title,
        category: values.category,
        status: values.status,
        priority: values.priority,
        date: values.date,
      });

      if (result.status === 200) {
        console.log(result.message);
        alert(false, result?.message);
      } else {
        alert(true, result?.message);
      }
    } catch (error) {
      alert(
        true,
        "Sorry, server is busy or not available right now. Please try again later !"
      );
      console.log(error.message);
    } finally {
      setSubmitting(false);
      refreshTasks();
      resetForm();
      setOpenPopup(false);
    }
  };
  return (
    <Formik
      initialValues={{
        title: "",
        category: "",
        priority: "",
        status: "",
        date: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        handleSubmit(values, setSubmitting, resetForm);
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
            <option value="">Select a priority</option>
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
            <option value="">Select a status</option>
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

export default CreateTaskForm;
