import { Loader2Icon, LoaderIcon } from 'lucide-react'
import React from 'react'

const PageLoader = () => {
  return (
    <div className='flex justify-center items-center min-h-screen'>
        <LoaderIcon className='animate-spin size-10 text-primary'/>
        
    </div>
  )
}

export default PageLoader