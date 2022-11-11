import ComponentItem from "../categorey-item/category-item.component";

import './directory.styles.scss';

const Directory = ({categories}) => {
    return (
        <div className="categories-container">
            {
                categories.map((category) => {
                    return (
                        <ComponentItem key={category.id} category={category} />
                    )
                })
            }
        </div>
    )
}

export default Directory;