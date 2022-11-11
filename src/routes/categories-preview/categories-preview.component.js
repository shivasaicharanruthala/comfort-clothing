import {Fragment, useContext} from "react";

import './categories-preview.styles.scss';
import CategoryPreview from "../../components/category-preview/category-preview.component";
import {CategoriesContext} from "../../contexts/categories.context";


const CategoriesPreview = () => {
    const { categoriesMap } = useContext(CategoriesContext);

    return (
        <Fragment>
            {
                // eslint-disable-next-line array-callback-return
                Object.keys(categoriesMap).map(title => {
                    const products = categoriesMap[title];
                    return (
                        <CategoryPreview key={title} title={title} products={products} />
                    )
                })
            }
        </Fragment>
    )
}

export default CategoriesPreview;