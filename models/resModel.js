const mongoose = require('mongoose')
const Schema = mongoose.Schema

//把我們想要的資料結構當成參數傳給 new Schema()
const resSchema = new Schema({
    name: {
        type: String, // 資料型別是字串
        required: true // 這是個必填欄位
    },
    name_en: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    google_map: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true,
        required: true
    }
})

//然後透過 module.exports 輸出, 匯出的時候我們把這份 model 命名為 Res, 以後在其他的檔案直接使用 Res 就可以操作有關的資料了
module.exports = mongoose.model('Res', resSchema)