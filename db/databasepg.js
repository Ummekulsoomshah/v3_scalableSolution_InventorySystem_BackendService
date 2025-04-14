const {Client}=require('pg')

const client=new Client({
    host: 'localhost',
    user: 'postgres',
    post: '5432',
    password: 'kulsoompg',
    database: 'inv_tracking_system'
})
client.connect()
client.query(`create table if not exists store(id serial primary key, name varchar(255),address text)`,(err,res)=>{
    if(!err){
        console.log(res.rows)
    }else{
        console.log(err.message)
    }
});
client.query(`create table if not exists product(id serial primary key,name varchar(255),price int)`,(err,res)=>{
    if(!err){
        console.log(res)
    }else{
        console.log(err.message)
    }
})
client.query(`create table if not exists storeStock
    (id serial primary key
    ,store_id int references store(id)
    ,product_id int references product(id),
    quantity int)`,(err,res)=>{
        if(!err){
            console.log(res)
        }else{
            console.log(err.message)
        }
    })
    

module.exports=client