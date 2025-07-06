import React from "react";
import { useState,useEffect } from "react";

const Pagination = () =>{

  const [products, setProducts] = useState([])
  const [pages, setPages] = useState(1)

  const fetchProducts = async () => {
    const res = await fetch('https://dummyjson.com/products?limit=100');
    const data = await res.json();

    setProducts(data.products)
  };
  
 console.log(products)
 

  useEffect(() => {
    fetchProducts();
  },[])

  const changePage = (selectedPage) =>{
    // if(selectedPage <= 1 && selectedPage <= products.length && selectedPage !== pages )
    setPages(selectedPage);
  }

  return(
    <div>
      {
        products.length > 0 && (<div className="products">
          {products.slice((pages * 10) - 10,pages * 10).map((item) => {
            return (
              <div key={item.id} style={{margin:"10px", border:"5px", border:"3px solid green"}}>

              {item.id}   
              <img src={item.thumbnail} alt={item.title}/>
              <span>{item.title}</span>

              </div>
            )
          })}
        </div>
        )
      }
        {products.length > 0 && <div className="pagination">
            <span onClick={() => changePage(pages-1)}>◀️</span>
            <span>{[...Array(products.length/10)].map((_,i)=>{
              return(
                <span key={i} onClick={() => changePage(i+1)} 
                style={{padding:"10px", margin:"5px", border:"1px solid black"}}
                >{i+1}</span>
              )
            })}</span>
            <span onClick={() => changePage(pages+1)}>▶️</span>
          </div>}
    </div>
  )
}

export default Pagination;
