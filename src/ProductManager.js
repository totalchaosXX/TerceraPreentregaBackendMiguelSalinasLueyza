const fs = require('fs')

const filePath = './Product.json';

class ProductManager {

    static id = 0;

    title;
    description;
    price;
    thumbnail;
    code;
    stock;
    products;
    path;

    constructor(title, description, price, thumbnail, code, stock,path) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        this.products = [];
        this.path=path;
      }

    async addProduct(title, description, price, thumbnail, code, stock) {
        const product = {
          id: ProductManager.id++,
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
        };

        try{
            if(!fs.existsSync(filePath)){
                const emptyList = [];
                emptyList.push(product);

                
                    await fs.promises.writeFile(
                        filePath,
                        JSON.stringify(emptyList,null,'\t')
                    );
                
            }
            else{
                
                    const contentOBJ = await this.getProducts();
                    contentOBJ.push(product);
                    await fs.promises.writeFile(
                        filePath,
                        JSON.stringify(contentOBJ,null,'\t')
                    ); 
            
            }
        }catch(error){
            console.log(error);
        }
        
    }

    async getProducts() {
        const content = await fs.promises.readFile(filePath,'utf-8');
        const contentObj = JSON.parse(content);
        return contentObj;
    }

    async getById(id) {

        const content = await fs.promises.readFile(filePath,'utf-8');
        const contentObj = JSON.parse(content);

        const getProduct = contentObj.find((x) => x.id === id);
    
        if (getProduct != undefined) {
          return console.log(getProduct);
        }
    
        return console.log("Not found");
    }

    async updateProduct(id,title, description, price, thumbnail, code, stock){

        const content = await fs.promises.readFile(filePath,'utf-8');
        const contentObj = JSON.parse(content);

        const productToUpdate = contentObj.find((x) => x.id === id);

    
        if (productToUpdate) {

            productToUpdate.title = title;
            productToUpdate.description = description;
            productToUpdate.price = price;
            productToUpdate.thumbnail = thumbnail;
            productToUpdate.code = code;
            productToUpdate.stock = stock;


            await fs.promises.writeFile(filePath, JSON.stringify(contentObj, null, '\t'));

            return console.log('Object updated successfully');
        }
    
        return console.log("Not found");
    }

    async deleteProduct(id){
        const contentOBJ = await this.getProducts();
        const productWithoutId = contentOBJ.filter((x) => x.id != id);
        await fs.promises.writeFile(
            filePath,
            JSON.stringify(productWithoutId,null,'\t')
        );
    }
}

const tienda = new ProductManager("Polera Fred Perry");



const manageProducts = async () => {

await tienda.addProduct(
        "Polera Fred Perry",
        "Manga corta",
        45000,
        "www.nada.cl/asdgasdas",
        "fp001",
        33
      );

await tienda.addProduct(
        "Polera Fred Perry",
        "Manga corta",
        78000,
        "www.nada.cl/asdgasdas",
        "fp002",
        60
      );

     await tienda.getById(2);

      await tienda.updateProduct(
        1,
        "Polera Fred Perry",
        "Manga Larga",
        80000,
        "www.nada.cl/asdgasdas",
        "fp002",
        80
      );

  };

  manageProducts();


 // const products = tienda.getProducts().then((x)=> console.log(x));


module.exports = ProductManager;