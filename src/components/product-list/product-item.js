import React from 'react';
import s from './product-list.module.scss'


const ProductItem = (props) => {

    const {id, name, price, date, category, editProduct, deleteProduct} = props;

    return (
        <div className={s.productItem}>
            <div className={s.productProps}>
                <p className={s.productName}>{name}</p>
                <p>{price}</p>
                <p>{date}</p>
                <p>{category}</p>
            </div>
            <div className={s.btnBlock}>
                <button onClick={() => editProduct(id, name, price, date, category)} className={`material-icons`}>edit</button>
                <button onClick={() => deleteProduct(id)} className={`material-icons`}>delete</button>
            </div>
        </div>
    )
};

export default ProductItem;