import React, {useState} from 'react';
import s from './categories.module.scss'

const Categories = ({
                        categories,
                        setCategories,
                        categoryChangeDelete,
                        getProductsCurrentCategory,
                        deleteCategory,
                        productsCategoryChange}) => {


    const [value, setValue] = useState('');
    const [addFormState, setAddFormState] = useState(false);
    const [editState, setEditState] = useState(false);
    const [editCategoryName, setEditCategoryName] = useState('');
    const [categoryChange, setCategoryChange] = useState('');

    const existCategory = categories.find(category => category.categoryName === value);

    const addCategory = (e) => {
        const indexCategory = categories.findIndex(e => e.categoryName === editCategoryName);
        if(!existCategory) {
            setCategories([...categories, {categoryName: value}])
        }
        if(existCategory && !editState) {
            alert('Категория уже сущевтсвует');
        }
        if (editState) {
            setCategories([
                ...categories.slice(0, indexCategory),
                {categoryName: value},
                ...categories.slice(indexCategory + 1),
            ])
        }

        setValue('');
        setAddFormState(false);
        setEditState(false);
        e.preventDefault();
    };

    const editCategory = (categoryName) => {
        setAddFormState(true);
        setEditState(true);
        setValue(categoryName);
        setEditCategoryName(categoryName)
    };

    return (
        <div className={s.categories}>
            <h3>Categories</h3>
            <button onClick={() => setAddFormState(true)} className={s.btnAdd}>Add category</button>

            {addFormState &&
                <form onSubmit={addCategory} className={s.categoryAdd}>
                    <label>
                        <input type='text'
                               required minLength='2' maxLength='25'
                               value={value}
                               onChange={(e) => setValue(e.target.value)}
                        />
                        <button type='submit' className={`material-icons`}>save</button>
                    </label>
                </form>
            }

            {productsCategoryChange &&
                <form onSubmit={() => categoryChangeDelete(categoryChange)} className={s.categoryChange}>
                    <label>Choose product category
                        <div className={s.selectBlock}>
                            <select value={categoryChange} required={categories.length} onChange={(e) => setCategoryChange(e.target.value)}>
                                <option value={''}>--</option>
                                {categories.map(category =>
                                    <option key={category.categoryName} value={category.categoryName}>{category.categoryName}</option>
                                )}
                            </select>
                            <button> OK </button>
                        </div>
                    </label>
                </form>
            }

            <div className={s.list}>
                <p onClick={() => getProductsCurrentCategory('')}>All</p>
                {categories.map(category =>
                    <div key={category.categoryName}  className={s.item}>
                        <p onClick={() => getProductsCurrentCategory(category.categoryName)}>{category.categoryName}</p>
                        <div className={s.btnBlock}>
                            <button onClick={() => editCategory(category.categoryName)} className={`material-icons`}>edit</button>
                            <button onClick={() => deleteCategory(category.categoryName)} className={`material-icons`}>delete</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
};

export default Categories;