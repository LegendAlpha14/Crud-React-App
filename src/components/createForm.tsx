// import { MdDelete } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import styles from '../css/form.module.css'


export default function CreatForm() {

    return (
        <>
            <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
                <input className={styles.input} type="text" name="" id="" placeholder="City" />
                <input className={styles.input} type="text" name="" id="" placeholder="State" />
                <button style={{  outline:"none",border:"none"}} className={`${styles.button}`} > <AiFillDelete style={{color: "#FF204E",}}/></button>

            </div>
        </>
    )
}