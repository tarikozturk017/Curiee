const Header = ({headline, subtext}) => {
    return (
        <>
             <h1 class="text-3xl font-bold tracking-widest">{headline}</h1>
            <p>{subtext}</p>
        </>
    )
}

export default Header;