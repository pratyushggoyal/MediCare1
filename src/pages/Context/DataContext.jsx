import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { errorState } from '../../Redux/action'
import { Product_API } from '../../api'
export const Data = createContext()

const updatedUrl = (api, sort, order, subcategory, sortCategory, manufacturer, sliderVal) => {

    return sort && sliderVal && sortCategory && manufacturer ?
        `${api}&_sort=${sort}&_order=${order}&category=${sortCategory}&manufacturer=${manufacturer}&actual_price_gte=${sliderVal[0]}&actual_price_lte=${sliderVal[1]}` :
        sort && sliderVal && subcategory && manufacturer ?
            `${api}&_sort=${sort}&_order=${order}&sub_category=${subcategory}&manufacturer=${manufacturer}&actual_price_gte=${sliderVal[0]}&actual_price_lte=${sliderVal[1]}` :
            sort && sortCategory && subcategory ?
                `${api}&_sort=${sort}&_order=${order}&category=${sortCategory}&sub_category=${subcategory}` :
                sortCategory && subcategory && manufacturer ?
                    `${api}&category=${sortCategory}&sub_category=${subcategory}&manufacturer=${manufacturer}` :
                    sort && sliderVal && sortCategory ?
                        `${api}&_sort=${sort}&_order=${order}&category=${sortCategory}&actual_price_gte=${sliderVal[0]}&actual_price_lte=${sliderVal[1]}` :
                        sort && sliderVal && subcategory ?
                            `${api}&_sort=${sort}&_order=${order}&sub_category=${subcategory}&actual_price_gte=${sliderVal[0]}&actual_price_lte=${sliderVal[1]}` :
                            sort && sliderVal && manufacturer ?
                                `${api}&_sort=${sort}&_order=${order}&manufacturer=${manufacturer}&actual_price_gte=${sliderVal[0]}&actual_price_lte=${sliderVal[1]}` :
                                sortCategory && subcategory ?
                                    `${api}&category=${sortCategory}&sub_category=${subcategory}` :
                                    sortCategory && manufacturer ?
                                        `${api}&category=${sortCategory}&manufacturer=${manufacturer}` :
                                        subcategory && manufacturer ?
                                            `${api}&sub_category=${subcategory}&manufacturer=${manufacturer}` :
                                            sort && subcategory ?
                                                `${api}&_sort=${sort}&_order=${order}&sub_category=${subcategory}` :
                                                sort && sliderVal ?
                                                    `${api}&_sort=${sort}&_order=${order}&actual_price_gte=${sliderVal[0]}&actual_price_lte=${sliderVal[1]}` :
                                                    sort ?
                                                        `${api}&_sort=${sort}&_order=${order}` :
                                                        subcategory && sliderVal ?
                                                            `${api}&sub_category=${subcategory}&actual_price_gte=${sliderVal[0]}&actual_price_lte=${sliderVal[1]}` :
                                                            subcategory ?
                                                                `${api}&sub_category=${subcategory}` :
                                                                sortCategory ?
                                                                    `${api}&category=${sortCategory}` :
                                                                    manufacturer ?
                                                                        `${api}&manufacturer=${manufacturer}` :
                                                                        sliderVal ?
                                                                            `${api}&actual_price_gte=${sliderVal[0]}&actual_price_lte=${sliderVal[1]}` :
                                                                            api
}


const DataContext = ({ children }) => {
    const Categories = [
        
       
        {
            cat: "All Essentials",
            cat_image: "https://www.netmeds.com/images/cms/aw_rbslider/slides/1656007665_category-1000-x-200.jpg",
            sub_cat: ['Personal & Home Essentials',
                
                'Immunity Booster',
                'Business Essentials',
                'Travel Essentials',
                ]
        },
       
        
            
    ]
    const [sliderVal, setSliderVal] = useState([0, 45000])
    const [prod, setProd] = useState([]);
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState("");
    const [sortCategory, setSortCategory] = useState();
    const [total, setTotal] = useState(1747);
    const [currItem, setCurrItem] = useState(20);
    const [subCategory, setSubCategory] = useState("");
    const [order, setOrder] = useState("");
    const [manufacturer, setManufacturer] = useState('');
    const [loading, setLoading] = useState(false);
    const [currProduct, setCurrProduct] = useState({});
    const dispatch = useDispatch();

    const getProduct = () => {
        setLoading(true)
        const api = updatedUrl(`${Product_API}?_page=${page}&_limit=20`, sort, order, subCategory, sortCategory, manufacturer, sliderVal)
        console.log(api)
        axios.get(api)
            .then(res => {
                setLoading(false)
                setTotal(res.headers['x-total-count'])
                setCurrItem(res.data.length)
                setProd(res.data)
                // console.log(total, currItem, prod)
            })
            .catch(() => dispatch(errorState()))
            .finally(() => setLoading(false))
    }
    const handlePriceRange = (val) => {
        setSliderVal(val)
    }
    const handlecurrProduct = (item) => {
        setCurrProduct(item)
    }

    useEffect(() => {
        getProduct()
    }, [page, sort, order, subCategory, sortCategory, manufacturer, sliderVal])

    const handleReset = (p, sub, categ, manu, slid) => {
        handlePage(p)
        handleSubCategory(sub)
        handleCategory(categ)
        handleManufacturer(manu)
        handlePriceRange(slid)
    }
    const handleSubCategory = (sub, p, manu, cat) => {
        handlePage(p)
        handleCategory(cat)
        handleManufacturer(manu)
        setSubCategory(sub)
        console.log("subcategory", subCategory)
    }
    const handleCategory = (val) => {
        const newVal = val;
        setSortCategory(newVal)
    }
    const handleManufacturer = (val) => {
        console.log("manufacturer", val)
        const newVal = val;
        setManufacturer(newVal)
    }

    const handlePage = (val) => {
        setPage(val);
    }
    const setval = (sortval, orderval) => {
        setSort(sortval);
        setOrder(orderval)
        console.log('sortcalled', sort, order)
    }

    const val = {
        Categories, handleReset, setval, handlePage, handleManufacturer, handleSubCategory, getProduct, handleCategory, handlecurrProduct, currProduct, sortCategory, loading, prod, page, sort, currItem, total, manufacturer, order, handlePriceRange, sliderVal
    }
    return (
        <Data.Provider value={val}>
            {children}
        </Data.Provider>
    )
}

export default DataContext