
const barItems = ['My Patients', 'My Treatment Models', 'Create New Treatment Model', 'Explore Treatments', 'My Appointments']

const SideBar = () => {

    const listItems = barItems.map((item) => {
        return (
            <li className=" text-2xl hover:mx-1 mt-2 hover:text-black hover:bg-slate-100 hover:rounded-md cursor-pointer" key={item}>{item}</li>
        )
    })

    return (
        <div className=" p-10 text-white bg-slate-900 h-screen absolute w-1/6 pt-5" >
            <p className=" text-center text-xl">FirstName LastName</p>
            <ul className=" ">
                {listItems}
            </ul>
        </div>
    )
}

export default SideBar