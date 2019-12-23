import React from 'react';
import s from './product-list.module.scss'


const AddProductForm = (props) => {

    const {name, price, date, category, setName, setPrice, setDate, setCategory, addProduct, categories} = props;

    let currentDate = new Date();
    currentDate.setDate(new Date().getDate() + 1);
    let validDate = currentDate.toISOString().split('T')[0];

    return (
        <div>
            {props.productFormState &&
                <form onSubmit={addProduct} className={s.addProductForm}>
                    <label>Name
                        <input type='text'
                               required
                               minLength='5' maxLength='40'
                               value={name}
                               onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <label>Price
                        <input type='number'
                               required
                               min='0.01' step='0.01'
                               value={price}
                               onChange={(e) => setPrice(e.target.value)}
                        />
                    </label>
                    <label>Data
                        <input type='date'
                               required
                               min={validDate}
                               value={date}
                               onChange={(e) => setDate(e.target.value)}
                        />
                    </label>
                    <label>Category
                        <select value={category}
                                required
                                onChange={(e) => setCategory(e.target.value)}>
                            <option value=''>--</option>
                            {categories.map(category =>
                                <option key={category.categoryName} value={category.categoryName}>{category.categoryName}</option>
                            )}
                        </select>
                    </label>
                    <button type="submit" className={`material-icons`}>save</button>
                </form>
            }
        </div>
    )
};

export default AddProductForm;