

const HeaderMenu = (props) =>{
    const pages=props.data;
    let select=pages.map((item) =>
        <div className={(item['Название'] === 'Главная') ? "chosen leftMenu" : "leftMenu"}>
            <a href={item['Ссылка']}>{item['Название']}</a>
        </div>
    );
    console.log(pages[0])
    return(
        <div className='menuBackground'>
            <div className='menu'>
                {select}
            </div>
            <br></br>
            <div className="menuTitle">Самолёты</div>
        </div>)
}
export default HeaderMenu