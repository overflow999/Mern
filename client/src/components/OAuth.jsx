import {GoogleAuthProvider,getAuth,signInWithPopup} from 'firebase/auth';
import { UseDispatch, useDispatch } from 'react-redux';
import {app} from '../firebase'
import { signInSuccess } from '../redux/user/userSlice';

export default function OAuth() {
    const dispach = useDispatch();
    const handlegoogle =async ()=>{
        try {

            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)

            const result = await signInWithPopup(auth,provider)
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({name: result.user.displayName, email: result.user.email ,photo:result.user.photoUrl}),
              });
              const data = await res.json()
              dispatch(signInSuccess(data))
            
        } catch (error) {
            
        }
    }
  return (
    <button 
   onClick={handlegoogle} className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>continue with google</button>
  )
}
