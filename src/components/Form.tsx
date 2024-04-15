import { useEffect, useState } from 'react';
import styles from '../css/form.module.css'
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import axios from 'axios';



export default function Form() {

    const location = useLocation();
    const navigate = useNavigate()

    const [fileUrl, setFileUrl] = useState<any>();
    const [submitState, setSubmitState] = useState(false);

    const { control, unregister, register, handleSubmit, setValue, formState: { errors } } = useForm<any>({
        defaultValues: { title: '', price: '', discription: '', sku: '', image: '' },
    })


    const { fields, append, remove } = useFieldArray({ control, name: "test" });

    const [show, setShow] = useState(true)



    // submitState ? image.error

    //After Click to edit button Form Value set to edited product
    useEffect((): any => {

        (async () => {
            if (location.state != null) {
                const id = location.state
                console.log(id);

                setSubmitState((prev) => { return !prev })
                const response = await axios.get('http://localhost:3000/')
                // @ts-ignore
                // const productArray = JSON.parse(localStorage.getItem('productArray'))
                const productArray = response.data.data
                console.log(productArray);

                const index = productArray.findIndex((item: any) => item._id == id)
                const product = productArray[index];
                console.log(product);

                setFileUrl(`http://localhost:3000/uploads/${product.imageName}`)
                setValue("title", product.title)
                setValue("price", product.price)
                setValue("discription", product.discription)
                setValue("sku", product.sku)
                setValue("city", product.city)
                setValue("state", product.state)
                console.log(product);

                product.test.map((city: any) => {
                    console.log(city);

                    append({ firstName: city.firstName, lastName: city.lastName })
                })
            }
        })()
    }, [location.state])


    const onSubmit = async (data: any) => {



        data.image = data.image[0]
        console.log(data);
        data.imageName = data.image.name

        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }
        axios.post('http://localhost:3000/', data, config).then((response) => {
            console.log(response);

            // console.log("data send sucessfully");
        })

        const newObject = { ...data };

        newObject.image = data.image.name



        storeDataToLocalStorage(newObject);

        setValue("title", "")
        setValue("price", "")
        setValue("discription", "")
        setValue("sku", "")
        setValue("image", "")
        setFileUrl("")
        setValue("city", "")
        setValue("state", "")
        toast.success('Product Added !')
        remove()
        // navigate("/")
        setShow((prev) => !prev)
        unregister('image')

        setShow((prev) => !prev)

    }

    const editSubmit = async (data: any) => {

        const id = location.state;

        if (data.image) {
            data.image = data.image[0]
            data.imageName = data.image.name;
        }


        data._id = id
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }

        console.log("data");

        console.log(data);


        const response = await axios.post('http://localhost:3000/edit', data, config)

        console.log(response.data);
        unregister('image');


        navigate("/")
    }



    console.log(errors.image);






    return (

        <div className={styles.formParent}>

            <div className={styles.header}>
                <h1 style={{ color: "rgba(255, 32, 78,0.8)" }}>Product Details</h1>
                <hr className={styles.hrLine} />

            </div>

            <form className={styles.form} onSubmit={submitState ? handleSubmit(editSubmit) : handleSubmit(onSubmit)} action="/proucts">

                <label className={styles.label}>
                    {/* @ts-ignore */}
                    <div> Title* {"  "} {errors.title && <span style={{ color: "white" }}>{errors?.title?.message}</span>}</div>

                    <input
                        className={styles.input}
                        type="text"
                        {...register("title",
                            {
                                required: "Title is required"
                            }
                        )}
                    />

                </label>

                <label className={styles.label}>
                    {/* @ts-ignore */}

                    <div>Price* {"  "}  {errors.price && <span style={{ color: "white" }}>{errors.price.message}</span>}</div>
                    <input
                        className={styles.input}
                        type="number"

                        {...register("price",
                            {
                                required: "Price Is required",
                                min: {
                                    value: 0,
                                    message: "value grater than 0"
                                }
                            }
                        )}
                    />

                </label>


                <label className={styles.label}>
                    {/* @ts-ignore */}

                    <div>Discription*  {"  "}  {errors.discription && <span style={{ color: "white" }}>{errors.discription.message}</span>}</div>
                    <textarea
                        className={styles.input}


                        id="" cols={30} rows={5}
                        {...register("discription",
                            {
                                required: "Discription Is required"
                            }
                        )}

                    >
                    </textarea>
                </label>

                <label className={styles.label}>
                    {/* @ts-ignore */}

                    <div>SKU* {"  "}  {errors.sku && <span style={{ color: "white" }}>{errors.sku.message}</span>}
                    </div>
                    <input

                        className={styles.input}
                        type="number"
                        {...register("sku",
                            {
                                required: "SKU is required",
                                min: {
                                    value: 1,
                                    message: "SKU should be grather thant 0"
                                }
                            })
                        }

                    />

                </label>

                <label className={styles.label}>
                    {/* @ts-ignore */}

                    <div>Image* {"  "} {errors.image && <span style={{ color: "white" }}>{errors.image.message}</span>}</div>


                    {
                        submitState ?

                            show && <input

                                multiple={true}
                                type="file"
                                id="image"
                                {...register('image', {
                                    onChange: (e: any): any => {


                                        setFileUrl(URL.createObjectURL(e.target.files[0]))
                                    },
                                    // required: "image is required",



                                })}
                            /> :
                            show && <input

                                multiple={true}
                                type="file"
                                id="image"
                                {...register('image', {
                                    onChange: (e: any): any => {


                                        setFileUrl(URL.createObjectURL(e.target.files[0]))
                                    },
                                    required: "image is required",



                                })}
                            />
                    }

                </label>

                {fileUrl && <div ><img className={styles.image} src={fileUrl} alt="" /></div>}

                <h3>Address :   &nbsp;&nbsp;

                    <button
                        className={styles.button}
                        type="button"
                        onClick={() => append({ firstName: "", lastName: "" })}
                    >
                        Add Address
                    </button>
                </h3>

                <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
                    <input className={styles.input} type="text" id="" placeholder="City" {...register("city", { required: true })} />
                    <input className={styles.input} type="text" id="" placeholder="State" {...register("state", { required: true })} />

                </div>


                {fields.map((item, index) => (
                    <div style={{ display: "flex", flexDirection: "row", gap: "3px" }} key={item.id}>
                        <input placeholder='City' className={styles.input} {...register(`test.${index}.firstName`)} />
                        <Controller
                            render={({ field }) => <input placeholder='State' className={styles.input} {...field} />}
                            name={`test.${index}.lastName`}
                            control={control}
                        />
                        <button className={styles.button} type="button" onClick={() => remove(index)}>Delete</button>
                    </div>
                ))}













                <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>

                    <input className={styles.button} type="submit" value={submitState ? "update" : "Submit"} />
                    <input className={styles.button} onClick={() => { navigate('/') }} type="button" value="Go Back" />

                </div>
                <ToastContainer />


            </form>

        </div>
    )
}

function storeDataToLocalStorage(item: any) {

    const tempArray: any = []

    if (localStorage.getItem("productArray") === null) {
        localStorage.setItem("productArray", JSON.stringify(tempArray))
    }

    // @ts-ignore
    let productArray: any = JSON.parse(localStorage.getItem("productArray"))

    const id = Math.ceil(Math.random() * 100000)
    let newArray: any = [...productArray, { ...item, id }]

    localStorage.setItem("productArray", JSON.stringify(newArray))
}