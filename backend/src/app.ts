import express from 'express'
import cors from 'cors'
import { getRequest, getAndSaveFormData, deletImage , editProduct} from './controller/controller'
import { config } from './controller/multerConfig';
import {DBConnection} from './database/connection'

const upload = config();
const app = express();
DBConnection()
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));


app.get('/', getRequest)

app.post('/', upload.single('image'), getAndSaveFormData)

app.post('/delet', deletImage)

app.post('/edit', upload.single('image'),editProduct)

app.listen(3000, () => {
    console.log("server is started on 3000 port");
})
