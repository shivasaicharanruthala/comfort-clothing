import {createContext, useState, useEffect} from "react";
import {getCategoriesAndDocuments} from "../utils/firebase/firbase.utils";


export const CategoriesContext = createContext({
    categoriesMap: {},
    setCategoriesMap: () => null,
})

export const CategoriesProvider = ({ children }) => {
    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA);
    // }, [])

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            setCategoriesMap(categoryMap);
        }

        getCategoriesMap();
    }, [])

    const [categoriesMap, setCategoriesMap] = useState({});
    const value = {categoriesMap, setCategoriesMap}

    return <CategoriesContext.Provider value={value}> {children} </CategoriesContext.Provider>
}