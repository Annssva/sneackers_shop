import React from "react";
import Card from "./components/Card"
import Header from "./components/Header";
import Drawer from "./components/Drawer";

function App() {
    const [items, setItems] = React.useState([])
    const [cartItems, setCartItems] = React.useState([])
    const [cartOpened, setCartOpened] = React.useState(false)

    React.useEffect(() => {
        fetch('https://65f19b0b034bdbecc76326dd.mockapi.io/items').then(res => {
            return res.json()
        }).then(json => {
            setItems(json)
        })
    }, [])

    const onAddToCart = (obj) => {
        setCartItems(prev => [...prev, obj])
    }
    return (
        <div className="wrapper clear">
            {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)}/>}
            <Header onClickCart={() => setCartOpened(true)} />
            <div className="content p-40">
                <div className="d-flex align-center justify-between mb-40">
                    <h1 className="">Все кроссовки</h1>
                    <div className="search-block d-flex">
                        <img src="/img/search.svg" alt="Search"/>
                        <input placeholder="Поиск..."/>
                    </div>
                </div>


                <div className="d-flex flex-wrap">
                    {items.map((item) => (
                        <Card
                            title={item.title}
                            price={item.price}
                            imageUrl={item.imageUrl}
                            onFavorite={() => console.log('Добавлено в избранное')}
                            onPlus={(obj) => onAddToCart(obj)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
