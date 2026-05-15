import Table from "../../../components/Table"
import { categoriasStockTableInfo } from "../config/stock.config"

function CategoriasStockPage() {
  return (
    <Table
      dinamicTableInfo={categoriasStockTableInfo}
      tabTitleTemplate={`PRODUCTOS \"{nombre}\"`}
    />
  )
}

export default CategoriasStockPage