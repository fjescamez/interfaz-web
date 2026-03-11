import { useState } from 'react';
import { fileTableInfo } from '../../helpers/tablesInfo';
import Table from '../Table';
import { postData } from '../../helpers/fetchData';
import { notify } from '../../helpers/notify';

function FileTable({ setFilesModal, orderId, filePath }) {
    const [fileIds, setFileIds] = useState([]);

    const fileActions = async (variables) => {
        const { action } = variables;
        const data = {
            ids: fileIds,
            action
        };

        setFileIds([]);
        const response = await postData("files/print", data);

        if (response.status === "success") {
            notify(response.status, response.title, response.message);
        } else {
            notify(response.status, response.title, response.message);
        }
        return response;
    }

    return (
        <>
            <div className="overlay"></div>
            <div className="popUpTable">
                <Table
                    actions={fileActions}
                    checkedRows={fileIds}
                    setCheckedRows={setFileIds}
                    setPopUpTable={setFilesModal}
                    dinamicTableInfo={fileTableInfo}
                    orderFilter={orderId}
                    filePath={filePath}
                    customTable={true}
                />
            </div>
        </>
    )
}

export default FileTable