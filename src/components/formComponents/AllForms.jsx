import ContactForm from "./ContactForm";
import ClientForm from "./ClientForm";
import UserForm from "./UserForm";
import GroupForm from "./GroupForm";
import RefPlanchaForm from "./RefPlanchaForm";
import RefContinuoForm from "./RefContinuoForm";

const formMap = {
    ContactForm,
    ClientForm,
    UserForm,
    GroupForm,
    RefPlanchaForm,
    RefContinuoForm
}

function AllForms({ tableForm, ...props }) {
    const FormComponent = formMap[tableForm] || null;
    return FormComponent ? <FormComponent {...props} /> : "";
}

export default AllForms