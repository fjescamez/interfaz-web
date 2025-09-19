import { useEffect, useState } from 'react';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { PiStackLight } from 'react-icons/pi';
import { postData } from '../../helpers/fetchData';
import { BiFolder } from 'react-icons/bi';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { ThreeDot } from 'react-loading-indicators';

function ComparePopUp({ setCompareModal, rutaTrabajo }) {
  const [indexacion, setIndexacion] = useState([]);
  const [loading, setLoading] = useState(true);
  const [file1, setFile1] = useState("");
  const [file2, setFile2] = useState("");
  const [lastClickedFile, setLastClickedFile] = useState(null);
  const [comparar, setComparar] = useState("");
  const [compareLink, setCompareLink] = useState("");

  const post = {
    extraInputs: {
      rutaTrabajo
    }
  }

  useEffect(() => {
    const getIndexacion = async () => {
      const response = await postData("compare/getIndexacion", post);

      if (response && response.listFiles) {
        const defaultFile = response.listFiles.find(file => file.type === "file");
        setFile1(defaultFile);
        setIndexacion(response.listFiles);
        setLoading(false);
      }
    }
    getIndexacion();
  }, []);

  const handleClick = async (file) => {
    setLoading(true);
    setLastClickedFile(file);

    if (file.type === "folder") {
      const data = {
        rowObject: file
      }

      const response = await postData("compare/getIndexacion", data);
      if (response && response.listFiles) {
        setIndexacion(response.listFiles);
        setLoading(false);
      }
    }

    if (file.type === "file") {
      if (file1 === "") {
        setFile1(file);
      } else if (file2 === "") {
        setFile2(file);
      }
    }
  }

  useEffect(() => {
    if ((file1 !== "" && file2 === "") || (file1 === "" && file2 !== "")) {
      setLoading(true);
      const fetchData = async () => {
        const data = {
          rowObject: file1 || file2
        }

        const response = await postData("compare/getIndexacion", data);
        if (response && response.listFiles) {
          setLoading(false);
          setIndexacion(response.listFiles);
          setComparar(response.comparar);
        }
      };
      fetchData();
    }
  }, [file1, file2])

  useEffect(() => {
    if (file1 !== "" && file2 !== "" && lastClickedFile) {
      setLoading(true);
      const fetchFata = async () => {
        const data = {
          rowObject: lastClickedFile,
          extraInputs: { comparar }
        };

        const response = await postData("compare/getIndexacion", data);
        const url = response.comparar?.link.url;
        setCompareLink(url);
        setLoading(false);
      };
      fetchFata();
    }
  }, [file1, file2, lastClickedFile, comparar])

  return (
    <>
      <div className="overlay"></div>
      <div className="popUpTable ripPopUp">
        <div className="header">
          <PiStackLight />
          <p>COMPARADOR</p>
          <IoMdCloseCircleOutline className="close" onClick={() => setCompareModal(false)} />
        </div>
        <div className="ripContainer">
          <div className="files">
            <div className="formGroup">
              <label>Archivo A:</label>
              <input
                type="text"
                value={file1.name || ""}
                onDoubleClick={() => {
                  setFile1("");
                  setCompareLink("");
                }}
                readOnly
              />
            </div>
            <div className="formGroup">
              <label>Archivo B:</label>
              <input
                type="text"
                value={file2.name || ""}
                onDoubleClick={() => {
                  setFile2("");
                  setCompareLink("");
                }}
                readOnly
              />
            </div>
            {compareLink && <button type="button" onClick={() => window.open(compareLink, "_blank")}>Abrir Comparador</button>}
          </div>
          {loading ? (
            <p className='loading'>Cargando <ThreeDot color="black" size="small" speedPlus={2} /></p>
          ) :
            (<ul className="comparatorList">
              {indexacion.map((file, index) => (
                <li key={index} onDoubleClick={() => handleClick(file)}>
                  {file.type === "folder" ? <BiFolder /> : <IoDocumentTextOutline />}
                  {file.name}
                </li>
              ))}
            </ul>)}
        </div>
      </div>
    </>
  )
}

export default ComparePopUp