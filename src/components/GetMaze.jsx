import React from 'react'

function GetMaze({maze}) {
  return (
    <>
    {
        <div className='w-full flex direction-col justify-center overflow-scroll hideScroll'>
        <div className='w-auto border'>{
        maze?.map((singleMaze,i)=>{
            return( <div key={i+'A'} className='flex direction-row'>{singleMaze.map((singleMazeElement,j)=>{
                return (
                    <div key={i+'B'+j}>
                        {singleMazeElement === 'X' ? <div className='flex bg-black w-10 h-10 border-2 border-black items-center justify-center'>X</div> : singleMazeElement === 'S' ? <div className='bg-red-600 flex w-10 h-10 border-2 border-black items-center justify-center font-black'>S</div>: singleMazeElement === 'G'? <div className='bg-lime-600 flex w-10 h-10 border-2 border-black items-center justify-center font-black'>G</div>: <div className='bg-white w-10 h-10 border-2 border-black'></div>}
                    </div>
                )
            })}</div>)
        })
}</div>
</div>
    }</>
  )
}

export default GetMaze