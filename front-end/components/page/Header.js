const Header = ({headline, subtext}) => {
    return (
        <>
             <h1 className="text-3xl mb-4 font-bold tracking-widest">{headline}</h1>
            <p className=" mb-8">{subtext}</p>
        </>
    )
}

export default Header;