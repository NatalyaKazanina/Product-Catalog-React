import React, {useEffect, useState} from 'react';
import Categories from '../categories/categories';
import ProductList from '../product-list/product-list';
import s from './catalog-page.module.scss';


const CatalogPage = () => {

    const [categories, setCategories] = useState([
        {categoryName: 'Foodstuffs'},
        {categoryName: 'Cosmetic'}
    ]);

    const [products, setProducts] = useState([
        {id: 1, name: 'Rice flour', price: 112.8, date: '2020-06-10', category: 'Foodstuffs'},
        {id: 2, name: 'Buckwheat', price: 42.9, date: '2020-09-30', category: 'Foodstuffs'},
        {id: 3, name: 'Shampoo', price: 240, date: '2020-08-01', category: 'Cosmetic'},
        {id: 4, name: 'Balsam', price: 350, date: '2020-12-15', category: 'Cosmetic'}
    ]);

    const [currentProducts, setCurrentProducts] = useState([]);
    const [productsCategoryChange, setProductsCategoryChange] = useState('');

    useEffect(() => {
        setCurrentProducts(products)
    }, [products]);

    const getProductsCurrentCategory = (categoryName) => {
        const categoriesProducts = products.filter(p => p.category === categoryName);
        if(categoriesProducts) {
            setCurrentProducts(categoriesProducts)
        }
        if(categoryName === '') {
            setCurrentProducts(products);
        }
        if(!categoriesProducts && categoryName !== '') {
            setCurrentProducts([]);
        }
    };

    const deleteCategory = (categoryName) => {
        const categoriesProducts = products.filter(p => p.category === categoryName);
        if (categoriesProducts.length) {
            setProductsCategoryChange(categoriesProducts);
        }
        const updateCategories = categories.filter(category => category.categoryName !== categoryName);
        setCategories(updateCategories);
    };

    const categoryChangeDelete = (categoryName) => {
        const updatedCategoryOnProducts = productsCategoryChange.map(product => {
            return {...product, category: categoryName}
        });
        const filteredProducts = products.filter(p => productsCategoryChange.find(i => p.category !== i.category));

        setProducts([...filteredProducts, updatedCategoryOnProducts].flat(Infinity));
        setProductsCategoryChange('');
    };

    return (
        <div className={s.catalogWrap}>
            <h1>Catalog</h1>
            <div className={s.catalogPage}>
                <Categories categories={categories}
                            setCategories={setCategories}
                            getProductsCurrentCategory={getProductsCurrentCategory}
                            products={products}
                            deleteCategory={deleteCategory}
                            categoryChangeDelete={categoryChangeDelete}
                            productsCategoryChange={productsCategoryChange}
                />
                <ProductList products={currentProducts}
                             setProducts={setProducts}
                             categories={categories}
                             productsCategoryChange={productsCategoryChange}
                />
            </div>
        </div>
    )
};

export default CatalogPage;