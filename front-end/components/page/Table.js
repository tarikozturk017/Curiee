import Link from "next/link"

const Table = ({tableHeader, tableBody}) => {
    return (
    <div className=" shadow-lg shadow-blue-300/20 mx-auto rounded-lg p-1 w-full m-0 pt-5 max-w-[40%] mb-5" style={{ backgroundColor: 'rgba(255, 255, 255, 0.11)' }}>
        <table className='w-full'>
        <thead className="" style={{ backgroundColor: 'rgba(0, 0, 0, 0.45)' }}>
            
            {tableHeader}
        </thead>
        <tbody>
            
            {tableBody}
        </tbody>
        </table>

    </div>
    )
}

export default Table;