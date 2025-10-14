import React from 'react'
import DetailsHeader from '../components/DetailsHeader'
import GridComponent from '../components/GridComponent'
import { produccionPlanchasDetails, produccionTrabajosDetails } from '../helpers/detailsGrid';

function ProduccionPage() {

    return (
        <div className="detailsContainer">
            <DetailsHeader
                title={"PRODUCCIÓN"}
                hideAvatar={true}
                hideEditIcon={true}
                hideDeleteIcon={true}
            />
            <div className="detailsScroll">
                <GridComponent
                    title={produccionPlanchasDetails.title}
                    grid={produccionPlanchasDetails.grid}
                />
                <GridComponent
                    title={produccionTrabajosDetails.title}
                    grid={produccionTrabajosDetails.grid}
                />
            </div>
        </div>
    )
}

export default ProduccionPage
