const fs = require('fs/promises');


class Productos{
    constructor(ruta){
        this.ruta = ruta;
    }


    async getAll(){
        try{
            const objs = JSON.parse(await fs.readFile(this.ruta, 'utf-8'), null, 2)
            return objs;
        }catch(error){
            console.log('error: ', error)
        }
    }

    

    async save(obj, cb){
        const objs = cb;

        let newId;
        if(objs.length == 0){
            newId = 1;
        } else{
            newId =objs[objs.length - 1].id + 1;
        }

        const newObj = {id: newId, ...obj};
        objs.push(newObj);

        try{
            await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2));
            return newObj;
        } catch(error){
            console.log('error: ', error);
        }
        return console.log('id: ', newId);
    }

    async getById(id, cb){
        const objs = cb;
        objs.filter((item) => { 
            if(item.id == id){
                return console.log('item: ',item);
            }
        })
    }

    async deleteById(id, cb){
        const objs = cb;
        let newObj = objs.filter((item) => item.id !== id);
        
        try{
            await fs.writeFile(this.ruta, JSON.stringify(newObj, null, 2));
            return newObj;
        } catch(error){
            console.log('error: ', error);
        }
    }

    async deleteAll(cb){
        const objs = cb;
        let newObj = [];
        try{
            await fs.writeFile(this.ruta, JSON.stringify(newObj, null, 2));
            return newObj;
        } catch(error){
            console.log('error: ', error);
        }
    }
    async getTotalPrice(cb){
        const objs = cb;
        let precio;
        let precios = objs.map((item) => {precio +=item.precio})
        let precioTotal = precios.reduce((a, b) => a + b, 0)
        return console.log("total precio de arreglo: ", precio)
    }
    
}

async function main(){
    const producto = new Productos('./data.json')
    //await producto.save({'titulo': "", 'precio': "75000"}, await producto.getAll());
    //await producto.getById(4, await producto.getAll());
    //await contenedor.deleteById(14, await contenedor.getAll());
    console.log(await producto.getAll());
    //await deleteAll();
    await producto.getTotalPrice(await producto.getAll());
    
}
main();