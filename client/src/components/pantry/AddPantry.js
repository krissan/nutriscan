import React, { Fragment, useState, useEffect } from 'react';



export const AddPantry = (props) => {
    const blankProduct = [
        {Category: 'Vegetable', list:[{product: '', quantity: ''}]},
        {Category: 'Grain', list:[{product: '', quantity: ''}]},
        {Category: 'Dairy', list:[{product: '', quantity: ''}]},
        {Category: 'Meat', list:[{product: '', quantity: ''}]},
        {Category: 'Fruit', list:[{product: '', quantity: ''}]},
        {Category:'Misc', list:[{product: '', quantity: ''}]},
    ]

   const [product, setProduct] = useState(blankProduct);

    const onProductChange = (e, index1, index2) => {        
        const updatedProduct = product[index1];
        updatedProduct.list[index2][e.target.className] = e.target.value

        const updatedProductSet = product;
        updatedProductSet[index1] = updatedProduct;

        setProduct(updatedProductSet);
    }

    useEffect(() => {
        // Update the document title using the browser API
        console.log(product);
      });
    
    /*const addProduct = (e) => {
        e.preventDefault();
        setVegetables(
            [...vegetables, {...blankVegetable}]
        );
    }*/

    return <Fragment>
        <div className='row mealitemHeader'>
            <div className='col-sm-4'>
                Product
            </div>
            <div className='col-sm-4'>
                Quantity
            </div>
        </div>
        {
           /* products['Vegetable'] === undefined ?
                console.log(products['Vegetable'])
            :*/
            product.map((val, idx) => {
                return(
                    <div key={idx}>
                        <div>{val.Category}</div>
                        <div>
                            {val.list.map((vali, idxi) => {
                            let productId = `prod-${idxi}`, quantityId = `quan-${idxi}`;
                            let keyUniq = idx + "-" + idxi;
                            //console.log(product[idx].list[idxi].product);
                            return (
                                <div key={keyUniq}>
                                    <div className='row'>
                                        <div className='col-sm-4'>
                                            <label className="inputLabel">product</label>

                                            <input
                                                type="text"
                                                name={productId}
                                                className="product"
                                                value={product[idx].list[idxi].product}
                                                onChange={e => onProductChange(e, idx, idxi)}
                                            />
                                        </div>
                                        <div className='col-sm-4'>
                                            <label className="inputLabel">quantity</label>
            
                                            <input
                                                type="text"
                                                name={quantityId}
                                                className="quantity"
                                                value={product[idx].list[idxi].quantity}
                                                onChange={e => onProductChange(e, idx, idxi)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                            })}
                        </div>
                    </div>
                )
                
                
                /*let productId = `prod-${idx}`, quantityId = `quan-${idx}`;
                return (
                    <div key={idx}>
                        <div className='row'>
                            <div className='col-sm-4'>
                                <label className="inputLabel">product</label>
                                <input
                                    type="text"
                                    name={productId}
                                    data-idx={idx}
                                    className="product"
                                    value={product['Vegetable'][idx].product}
                                    onChange={e => onProductChange(e, 'Vegetable')}
                                />
                            </div>
                            <div className='col-sm-4'>
                                <label className="inputLabel">quantity</label>

                                <input
                                    type="text"
                                    name={quantityId}
                                    data-idx={idx}
                                    className="quantity"
                                    value={product['Vegetable'][idx].quantity}
                                    onChange={e => onProductChange(e, 'Vegetable')}
                                />
                            </div>
                        </div>
                    </div>
                )*/
            })
            
        }


    </Fragment>
};


export default AddPantry;