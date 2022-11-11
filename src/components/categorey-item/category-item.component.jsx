import './category-item.styles.scss';
import {Link} from "react-router-dom";

 const CategoryItem = ({category}) => {
     const {title, imageUrl} = category;
    return (
        <div className="category-container">
            <div className="background-image" style={{
                background: `url(${imageUrl})`
            }}/>
            <div className="category-body-container">
                <h2><Link to={`/shop/${title.toLowerCase()}`}>{title}</Link></h2>
                <p>Show Now</p>
            </div>
        </div>
    )
 }

 export default CategoryItem;