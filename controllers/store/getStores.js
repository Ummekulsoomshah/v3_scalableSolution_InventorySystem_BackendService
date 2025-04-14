const getAllStores=require('../../services/store/getAllStores')
const redisClient=require('../../redis/redisClient')
const DEFAULT_EXPIRATION = 3600

const getStores = async (req, res) => {
try {
    const data=await redisClient.get('stores')
    if (data) {
        console.log('Data from Redis:', JSON.parse(data))
        return res.status(200).json({
            success:true,
            message:'Stores fetched successfully',
            stores:JSON.parse(data)
        })
    }else{
        console.log('Fetching data from database...')
        const stores=await getAllStores()
        console.log('stores', stores)
        redisClient.setEx('stores', DEFAULT_EXPIRATION, JSON.stringify(stores))
        res.status(200).json({
            success:true,
            message:'Stores fetched successfully',
            stores
        })
    }
} catch (error) {
    next(error)
}
}
module.exports=getStores