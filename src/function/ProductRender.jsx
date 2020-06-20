import React from 'react';

function ProductRender(products, tables){
    var count=1
        
        let tableRecords = [];

        {
            products.map(
                product =>{
                    tableRecords.push(product);
                    

                   if(count==3){
                       count=0;
                       tables.push(NextLineTable(tableRecords));
                       tableRecords=[];
                   }
                   count= count+1;
                })
                tables.push(NextLineTable(tableRecords));
        }
}

function NextLineTable(records){
    

    return(
        <tr>{
            records.map(
            product =>
                
                <td><img className="image" src={require(`../images/${product.path}`)} alt="Spodnie" />
                <div><br></br>{product.name}
                    <br></br><br></br><div className="textPrice">{product.price} zł</div></div></td>
                
            
            )}
        </tr>)
    
}
export default ProductRender;