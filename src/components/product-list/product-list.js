import React, {useState} from 'react';
import ProductItem from './product-item';
import AddProductForm from './add-product-form';
import s from './product-list.module.scss';


const ProductList = (props) => {

    const [productId, setProductId] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [productFormState, setProductFormState] = useState(false);
    const [editProductState, setEditProductState] = useState(false);

    const indexProduct = props.products.findIndex(i => i.id === productId);
    const product = props.products[indexProduct];


    const addProduct = (e) => {
        if (editProductState) {
            props.setProducts([
                ...props.products.slice(0, indexProduct),
                {...product, name, price, date, category},
                ...props.products.slice(indexProduct + 1),
            ])
        }
        else {
            props.setProducts([...props.products, {id: Date.now(), name, price, date, category}]);
        }

        setName('');
        setPrice('');
        setDate('');
        setCategory('');
        setProductFormState(false);
        setEditProductState(false);
        e.preventDefault();
    };

    const editProduct = (id, name, price, date, category) => {
        setEditProductState(true);
        setProductFormState(true);
        setName(name);
        setPrice(price);
        setDate(date);
        setCategory(category);
        setProductId(id);
    };

    const deleteProduct = (productId) => {
        const updatedProducts = props.products.filter(product => product.id !== productId);
        props.setProducts(updatedProducts);
    };

    return (
        <>
            <div className={s.productList}>
                <h3>Product List</h3>
                <button onClick={() => setProductFormState(true)} className={s.btnAdd}>Add product</button>

                <AddProductForm
                    name={name}
                    setName={setName}
                    price={price}
                    setPrice={setPrice}
                    date={date}
                    setDate={setDate}
                    category={category}
                    setCategory={setCategory}
                    productFormState={productFormState}
                    setProductFormState={setProductFormState}
                    setEditProductState={setEditProductState}
                    addProduct={addProduct}
                    categories={props.categories}
                />

                {props.products.map(product =>
                    <ProductItem
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        date={product.date}
                        category={product.category}
                        editProduct={editProduct}
                        deleteProduct={deleteProduct}
                    />
                )}
            </div>
        </>
    )
};

export default ProductList;