import {ChevronRight} from 'lucide-react'
function Title({title}) {
  return (
    <div className='h-20 flex justify-start items-center text-xl md:text-2xl px-2 text-white'>
        <div className="flex justify-center items-center">
          <p>{title}</p>
           <ChevronRight />
        </div>
      </div>
  )
}

export default Title