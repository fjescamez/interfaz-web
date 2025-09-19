import ContactForm from "./ContactForm";
import ClientForm from "./ClientForm";
import UserForm from "./UserForm";
import GroupForm from "./GroupForm";

const formMap = {
    ContactForm,
    ClientForm,
    UserForm,
    GroupForm
}

function AllForms({ tableForm, ...props }) {
    const FormComponent = formMap[tableForm] || null;
    return FormComponent ? <FormComponent {...props} /> : "";
}

export default AllForms