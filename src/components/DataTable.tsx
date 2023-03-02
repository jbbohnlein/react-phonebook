import React, { useState } from "react"
import Button from "./Button"
import Modal from "./Modal"
import { server_calls } from "../api/server";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useGetData } from "../custom_hooks/FetchData";


const columns: GridColDef[] = [
    { field: 'id', headerName: "ID", width: 90, hide: true }, 
    { field: 'name', headerName: 'Contact Name', flex: 1},
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'phone_number', headerName: 'Phone Number', flex: 1},
    { field: 'address', headerName: 'Address', flex: 2}

]

function DataTable() {
    const [ open, setOpen ] = useState(false)
    const { contactData, getData } = useGetData();
    // selectionModel deals with whatever items have been selected using the checkbox
    const [ selectionModel, setSelectionModel ] = useState<string[]>([])

    // Below: useGetData hook and selection model state change contact

    const handleOpen = () => {
        setOpen(true)
    }

    const handleclose = () => {
        setOpen(false)
    }

    const deleteData = () => {
        server_calls.delete(selectionModel[0]);
        getData();
        console.log(`Selection model: ${selectionModel}`)
        setTimeout( () => { window.location.reload() }, 500)
    }

    return (
    <>
    {/*  Modal pop-up that lets you put in name, email, etc*/}
    <Modal 
        id={selectionModel}
        open={open}
        onClose={handleclose}
    />


    {/* Buttons section for controlling CRUD operations */}
    <div className="flex flex-row">
        <div>
            <button className="p-3 bg-slate-300 m-3 rounded hover:bg-slate-800 hover:text-white"
            onClick={() => handleOpen()}>
                Create New Contact
            </button>
        </div>
        <Button onClick={handleOpen} className="p-3 bg-slate-300 m-3 rounded hover:bg-slate-800 hover:text-white">Update</Button>
        <Button onClick={deleteData} className="p-3 bg-slate-300 m-3 rounded hover:bg-slate-800 hover:text-white">Delete</Button>    
    </div>    

    <div className={ open ? "hidden" : "container mx-10 my-5 flex flex-col"}
        style={{ height: 400, width: '100%' }}
    >
        <h2 className="p-3 bg-slate-300 my-2 rounded">My Contacts</h2>
        <DataGrid rows={contactData} columns={columns} rowsPerPageOptions={[5]}
        checkboxSelection={true} 
        // Whatever is selected/checked (onSelectionModelChange), set the Selection Model to that item. 
        // This will stash it up above in the selectionModel, which we'll use to do some stuff with it.
        onSelectionModelChange={ (item:any) => {
            setSelectionModel(item)
        }}
        />
    </div>
    </>
  )
}

export default DataTable