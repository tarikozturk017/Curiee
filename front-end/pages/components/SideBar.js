
const barItems = ['My Patients', 'My Treatment Models', 'Create New Treatment Model', 'Explore Treatments', 'My Appointments']

const SideBar = ({ setMainContent }) => {

    const listItems = barItems.map((item) => {
        return (
            <li className=" text-xl font-semibold p-3 hover:text-black hover:bg-slate-100 hover:rounded-md cursor-pointer" 
                key={item}
                onClick={() => setMainContent(item)}
            >
                {item}
            </li>
        )
    })

    return (
        <div className="  p-10 text-white bg-slate-900 h-screen absolute min-w-min w-1/6 pt-5" >
            <p className=" m-5 text-center text-xl">FirstName LastName</p>
            <hr />
            <ul className=" mt-10 flex flex-col gap-5">
                {listItems}
            </ul>
        </div>
    )
}

export default SideBar