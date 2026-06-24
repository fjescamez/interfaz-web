import ContactForm from "../../modules/contacts/components/ContactForm";
import ClientForm from "../../modules/clients/components/ClientForm";
import UserForm from "../../modules/users/components/UserForm";
import GroupForm from "../../modules/contacts/components/GroupForm";
import RefPlanchaForm from "../../modules/production/components/RefPlanchaForm";
import RefContinuoForm from "../../modules/production/components/RefContinuoForm";
import CategoriaStockForm from "../../modules/stock/components/CategoriaStockForm";
import ProductoStockForm from "../../modules/stock/components/ProductoStockForm";
import OrdenCompraForm from "../../modules/stock/components/OrdenCompraForm";
import StrategyForm from "../../modules/strategies/components/StrategyForm";
import PalleteForm from "../../modules/pallette/components/PalleteForm";

const formMap = {
    ContactForm,
    ClientForm,
    UserForm,
    GroupForm,
    RefPlanchaForm,
    RefContinuoForm,
    CategoriaStockForm,
    ProductoStockForm,
    StrategyForm,
    PalleteForm
}

function AllForms({ tableForm, ...props }) {
    const FormComponent = formMap[tableForm] || null;
    return FormComponent ? <FormComponent {...props} /> : "";
}

export default AllForms