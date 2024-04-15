import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";
import ReactLoading from 'react-loading';


import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css



import axios from 'axios';



export default function DataTable() {



  // @ts-ignore
  const [array, setArray] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const [count, setTotalCount] = useState(10);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });


  const location = useLocation();

  useEffect(() => {
    // @ts-ignore
    const productArray = JSON.parse(localStorage.getItem("productArray"))
    // setArray(productArray)

    axios.get(`http://localhost:3000?count=${paginationModel.pageSize}&skip=${paginationModel.page}`).then((response: any) => {
      // console.log("response From Database");


      setArray(response.data.data)
      setTotalCount(response.data.total)


    })

  }, [location.state, paginationModel])


  async function deletItem(e: any) {

    const id = e.target.value

    const response = await axios.post("http://localhost:3000/delet", { id: id })
    console.log(response.data);
    console.log("nevigate");

    navigate("/", { state: id })
  }

  function updateItem(e: any) {
    const id = e.target.value
    console.log(id);

    // @ts-ignore
    // const productArray = JSON.parse(localStorage.getItem("productArray"))



    // const item = productArray.filter((item: any) => item.id == id)


    navigate('/products', { state: id })

  }

  function confirmBox(e: any) {

    // console.log(e.target.value);

    confirmAlert({
      title: 'Confirm to Delete',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => deletItem(e)

        },
        {
          label: 'No',
          onClick: () => console.log('Click No')
        }
      ]
    });


    // if (confirm("are YOu sure You want to delet" + e.target.value)) {
    //   deletItem(e);
    // }
  }



  const columns = [
    {
      field: "title",
      headerName: "Title",
      width: 100,
      height: 200,

    },
    {
      field: "price",
      width: 100,
      headerName: "Price",
      height: 200,

    },
    {
      width: 200,
      field: "discription",
      headerName: "Discripton",
      height: 200,

    },
    {
      width: 100,
      headerName: "Id",
      field: "_id",
      height: 200,

    },
    {
      width: 100,
      headerName: "SKU",
      field: "sku",
      height: 200,

    },
    {
      field: "imageName",
      headerName: "image",
      width: 300,
      height: 400,
      renderCell: (params: any) => {
        // console.log(`http://localhost:3000/uploads/${params.value}`);

        return <img src={`http://localhost:3000/uploads/${params.value}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      }
    },
    {
      headerName: "Action",
      type: "button",
      renderCell: (params: any) => {
        console.log("params");

        console.log(params.id);
        console.log("params");

        // console.log(params.id);

        return <div style={{ display: "flex", flexDirection: "row", gap: "5px", justifyContent: "center", alignItems: "center" }}>

          <button value={params.id} onClick={updateItem}>Edit</button>
          <button value={params.id} onClick={confirmBox}>Delete</button>
        </div>
      }
    },
    {
      headerName: "Address",
      width: 400,

      field: "test",
      renderCell: (params: any) => {
        // console.log("inside Test");

        // console.log(params);
        const array = params.value

        return <div style={{ display: "flex", flexDirection: "row", gap: "5px", listStyle: "none" }}>
          <li>{params.row.city}</li>
          {array.map((item: any) => {
            console.log(item);

            return <li key={item._id}>{item.firstName},</li>
          })}

        </div>
      }

    }
  ];

  // const productArray: any = localStorage.getItem("productArray")
  // const rows: any = JSON.parse(productArray);
  // console.log(rows);

  console.log(paginationModel);


  return (
    <div style={{ height: '60vh', width: '80vw', color: "black" }}>



      <button onClick={() => { navigate("/products") }}>Add Product</button>

      {loading ? <ReactLoading type={"spinningBubbles"} color={"black"} height={'20%'} width={'20%'} />
        : <DataGrid

          rows={array}
          // @ts-ignore
          columns={columns}
          getRowId={(row) => row._id}
          rowHeight={100}
          rowCount={count}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}

          paginationMode="server"
          onPaginationModelChange={setPaginationModel}
          paginationModel={paginationModel}
          autoHeight
        />}
    </div>
  );
}


