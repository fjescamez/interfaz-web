import Table from "../components/Table"
import { categoriasStockTableInfo } from "../helpers/tablesInfo"

function CategoriasStockPage() {
  return (
    <Table
      dinamicTableInfo={categoriasStockTableInfo}
      tabTitleTemplate={`PRODUCTOS \"{nombre}\"`}
    />
  )
}

export default CategoriasStockPage