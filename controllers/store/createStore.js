const addStore=require('../../services/store/addStore')
const createStore=async(req,res)=>{
    try {
        const {storeName,storeAddres}=req.body
        const store=await createStore(storeName,storeAddres)
        res.status(200).json({
            success:true,
            message:'Store created successfully',
            store
        })
    } catch (error) {
        next(error)
    }
}
module.exports=createStore