import { emailTableInfo } from '../../helpers/tablesInfo';
import Table from '../Table';

function EmailTable() {
    return (
        <Table
            tableData={[
                {
                    name: "Email 1",
                    subject: "Revisión",
                    body: "Hacer revisión"
                }
            ]}
            formComponent={""}
            modal={""}
            setModal={""}
            total={1}
            getData={""}
            page={1}
            setPage={""}
            search={""}
            setSearch={""}
            tableInfo={emailTableInfo}
            tableName={"emails"}
        />
    )
}

export default EmailTable