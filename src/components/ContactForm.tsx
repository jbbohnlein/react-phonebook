import Input from "./Input"
import Button from "./Button"

import { useForm } from 'react-hook-form';
import { server_calls } from "../api/server";
import { useDispatch, useStore } from "react-redux";
// the slices:
import { chooseName, chooseEmail, chooseAddress, choosePhone } from "../redux/slices/RootSlice";

// interface

interface ContactFormsProps {
  id?: string[]
}

const ContactForm = (props:ContactFormsProps) => {
  const { register, handleSubmit } = useForm({})
  //  lets me use the slices
  const dispatch = useDispatch();
  const store = useStore();

  const  onSubmit = (data: any, event: any) => {
    // prints out the ID
    console.log(`ID: ${typeof props.id}`);
    console.log(props.id)
    console.log(data)
    //  If there is an id associated with the contact being selected with the check-mark, send data
    if (props.id && props.id.length > 0) {
      server_calls.update(props.id[0], data)
      console.log(`Updated: ${ data.name } ${ props.id }`)
      // reload after 1 second (1000 milliseconds)
      setTimeout(() => {window.location.reload()}, 1000);
      event.target.reset()

    } else {
      
      // use dispatch to update our state in our store eg. dispatch sends the information to the store
      dispatch(chooseName(data.name));
      dispatch(chooseEmail(data.email));
      dispatch(chooseAddress(data.address));
      dispatch(choosePhone(data.phone_number));

      // This says to go to the store (local db we're accessing), and get the state (local storage item/info) (which was sent 
      // by the dispatch in the lines right about), view it, and CREATE a new user with that state/info
      server_calls.create(store.getState());
      console.log(`Created: ${ data.name } ${ props.id }`)
      // reload the page after 1 second:
      setTimeout( () => {window.location.reload()}, 1000);
    }
  }

  return (

    // TODO - FINISH HANDLE FUNCTION WITH STATE MANAGEMENT
    <div>
      <form onSubmit={(handleSubmit(onSubmit))}>
        <div>
          <label htmlFor="name">Contact Name
          </label>
          <Input {...register('name')} name="name" placeholder="Name"/>
        </div>
        <div>
          <label htmlFor="email">Email
          </label>
          <Input {...register('email')} name="email" placeholder="Email"/>
        </div>
        <div>
          <label htmlFor="phone_number">Phone Number
          </label>
          <Input {...register('phone_number')} name="phone_number" placeholder="Phone Number"/>
        </div>
        <div>
          <label htmlFor="address">Address
          </label>
          <Input {...register('address')} name="address" placeholder="Address"/>
        </div>
        <div className="flex p-1">
          <Button className="flex justify-start m-3 bg-slate-300 p-2 rounded hover:bg-slate-800 text-white"
          >
            Submit
          </Button>
        </div>
      </form>

    </div>
  )
}

export default ContactForm