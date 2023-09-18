import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { ResolveContactSupport } from '../redux/slices/support/supportSlice'

const SupportpageDisplay:React.FC = () => {
    const supportInfo=useSelector((state:RootState)=>state.support.supportContact);
   const dispatch = useDispatch<AppDispatch>()
  

    const handelResolve=(token:string)=>{
        dispatch(ResolveContactSupport({ token: token }))
    }   
  return (
    <>{supportInfo.length > 0 && 
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Token
                        </th>
                        <th scope="col" className="px-6 py-3">
                            complain Type
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Message
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {supportInfo.map((userInfo)=>(
                        <tr key={userInfo.token} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {userInfo.name}
                        </th>
                        <td className="px-6 py-4">
                            {userInfo.email}
                        </td>
                        <td className="px-6 py-4">
                            {userInfo.token}
                        </td>
                        <td className="px-6 py-4">
                            {userInfo.helpWith}
                        </td>
                        <td className="px-6 py-4">
                            {userInfo.message}
                        </td>
                        <td className="px-6 py-4">
                           <button className='bg-[#385A64] text-white shadow hover:shadow-lg px-3 py-2 rounded-lg ho' onClick={()=>handelResolve(userInfo.token)}>Resolve</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
        }
    </>
  )
}

export default SupportpageDisplay